import {
  int,
  bigint,
  varchar,
  singlestoreTable,
  index,
} from "drizzle-orm/singlestore-core";
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
