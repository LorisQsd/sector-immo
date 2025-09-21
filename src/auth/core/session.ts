import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/db";
import { SessionTable } from "@/db/schema/auth.schema";

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  id: z.string(),
});

type UserSession = z.infer<typeof sessionSchema>;
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = globalThis.crypto.randomUUID();

  // Nettoyer les anciennes sessions de cet utilisateur avant de créer la nouvelle
  await cleanupUserSessions(user.id);

  await db.insert(SessionTable).values({
    id: sessionId,
    userId: user.id,
    expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
  });

  setCookie(sessionId, cookies);
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  const user = await getUserSessionById(sessionId);
  if (user == null) return;

  await db
    .update(SessionTable)
    .set({
      expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    })
    .where(eq(SessionTable.id, sessionId));

  setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  await db.delete(SessionTable).where(eq(SessionTable.id, sessionId));
  cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  const session = await db.query.SessionTable.findFirst({
    where: eq(SessionTable.id, sessionId),
    with: {
      user: {
        columns: {
          id: true,
          role: true,
          isVerified: true,
        },
      },
    },
  });

  if (!session?.user) return null;

  return {
    id: session.user.id,
    role: session.user.role,
    isVerified: session.user.isVerified,
  };
}

/**
 * Nettoie les sessions obsolètes d'un utilisateur
 * Options disponibles :
 * - 'all': Supprime toutes les sessions existantes (par défaut, plus sécurisé)
 * - 'expired': Supprime seulement les sessions expirées
 * - 'limit': Garde seulement les N sessions les plus récentes
 */
async function cleanupUserSessions(
  userId: string,
  strategy: "all" | "expired" | "limit" = "all",
  maxSessions: number = 3
) {
  if (strategy === "all") {
    // Supprimer toutes les sessions existantes de cet utilisateur
    await db.delete(SessionTable).where(eq(SessionTable.userId, userId));
  } else if (strategy === "expired") {
    // Supprimer seulement les sessions expirées
    await db.delete(SessionTable).where(
      and(
        eq(SessionTable.userId, userId),
        // Sessions expirées (expiresAt < maintenant)
        sql`${SessionTable.expiresAt} < ${new Date()}`
      )
    );
  } else if (strategy === "limit") {
    // Garder seulement les N sessions les plus récentes
    const sessionsToDelete = await db
      .select({ id: SessionTable.id })
      .from(SessionTable)
      .where(eq(SessionTable.userId, userId))
      .orderBy(desc(SessionTable.createdAt))
      .offset(maxSessions);

    if (sessionsToDelete.length > 0) {
      const idsToDelete = sessionsToDelete.map((s) => s.id);
      await db
        .delete(SessionTable)
        .where(inArray(SessionTable.id, idsToDelete));
    }
  }
}

/**
 * Nettoie toutes les sessions expirées de la base de données
 * À appeler périodiquement (par exemple, dans un cron job)
 */
export async function cleanupExpiredSessions() {
  const deletedSessions = await db
    .delete(SessionTable)
    .where(sql`${SessionTable.expiresAt} < ${new Date()}`)
    .returning({ id: SessionTable.id });

  return deletedSessions.length;
}
