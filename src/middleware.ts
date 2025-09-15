import { type NextRequest, NextResponse } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "./auth/core/session";
import { paths } from "./constants/paths";

const publicRoutes: string[] = [paths.root];
const privateRoutes = Object.values(paths.protected);
const adminRoutes = Object.values(paths.protected.admin);

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);

    const isAlreadyConnected = user != null;

    if (isAlreadyConnected)
      return NextResponse.redirect(new URL(paths.protected.root, request.url));

    return NextResponse.next();
  }

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });

  return response;
}

async function middlewareAuth(request: NextRequest) {
  if ((privateRoutes as string[]).includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL(paths.root, request.url));
    }
  }

  if ((adminRoutes as string[]).includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL(paths.root, request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL(paths.root, request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
