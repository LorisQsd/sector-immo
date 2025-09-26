"use server";

import { db } from "@/db/db";
import { SectorTable } from "@/db/schema/sector.schema";
import { sectorSchema } from "../_schemas/sector.schema";

export const createSectorAction = async (_: unknown, formData: FormData) => {
  const { success, data, error } = sectorSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) return { errors: error.flatten().fieldErrors };

  try {
    await db.insert(SectorTable).values({
      ...data,
      id: globalThis.crypto.randomUUID(),
    });
  } catch (error) {
    console.error(error);
    return { success: false };
  }

  return { success: true };
};
