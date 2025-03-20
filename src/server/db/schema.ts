import {
  int,
  bigint,
  varchar,
  singlestoreTable,
  index,
} from "drizzle-orm/singlestore-core";
import { relations } from "drizzle-orm";
import { env } from "~/env";

export const users = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_users`,
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    age: int(),
    email: varchar({ length: 255 }).notNull(),
  },
  (t) => [index("idx_users_email").on(t.email)],
);

export const files = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_files`,
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 50 }).notNull(),
    size: int().notNull(),
    folderId: bigint("folder_id", { mode: "number", unsigned: true }).notNull(),
    ownerId: bigint("owner_id", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => [index("idx_files_folder_id").on(t.folderId)],
);

export const filesRelations = relations(files, ({ one }) => ({
  folder: one(folders, {
    fields: [files.folderId],
    references: [folders.id],
  }),
  owner: one(users, {
    fields: [files.ownerId],
    references: [users.id],
  }),
}));

export const folders = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_folders`,
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: varchar({ length: 255 }).notNull(),
    parentId: bigint("parent_id", { mode: "number", unsigned: true }),
    ownerId: bigint("owner_id", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => [index("idx_folders_parent_id").on(t.parentId)],
);

export const foldersRelations = relations(folders, ({ one, many }) => ({
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
  }),
  owner: one(users, {
    fields: [folders.ownerId],
    references: [users.id],
  }),
  files: many(files),
}));
