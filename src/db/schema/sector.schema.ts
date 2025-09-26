import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./auth.schema";

export const SectorTable = pgTable("sectors", {
  id: uuid("id").primaryKey(),
  color: text("color").notNull(),
  userId: uuid("user_id").references(() => UserTable.id),
});

export const sectorRelations = relations(SectorTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SectorTable.userId],
    references: [UserTable.id],
  }),
}));
