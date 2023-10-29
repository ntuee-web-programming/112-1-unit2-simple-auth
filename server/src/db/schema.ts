import {
  index,
  pgTable,
  serial,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
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
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId: uuid("user_id").notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    userIdIndex: index("user_id_index").on(table.userId),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);
