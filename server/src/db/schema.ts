import { index, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: varchar("display_id", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    hashedPassword: varchar("hashed-password", { length: 100 }).notNull(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);
export const todosTable = pgTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    displayId: varchar("display_id", { length: 50 }).notNull().unique(),
    userId: varchar("user_id", { length: 50 }).notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    userIdIndex: index("user_id_index").on(table.userId),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);
