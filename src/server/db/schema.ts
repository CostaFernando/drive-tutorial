import {
  bigint,
  varchar,
  singlestoreTable,
  index,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/singlestore-core";
import { relations } from "drizzle-orm";
import { env } from "~/env";

export const users = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_users`,
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (t) => [index("idx_users_email").on(t.email)],
);

export const sessions = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_sessions`,
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (t) => [index("idx_session_user_id").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accounts = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_accounts`,
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (t) => [index("idx_account_user_id").on(t.userId)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const verifications = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_verifications`,
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
);

export const files = singlestoreTable(
  `${env.SINGLESTORE_TABLES_PREFIX}_files`,
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    url: text("url"),
    type: varchar("type", { length: 50 }).notNull(),
    folderId: bigint("folder_id", { mode: "number", unsigned: true }).notNull(),
    ownerId: varchar("owner_id", { length: 36 }).notNull(),
  },
  (t) => [
    index("idx_files_folder_id").on(t.folderId),
    index("idx_files_owner_id").on(t.ownerId),
  ],
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
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    parentId: bigint("parent_id", { mode: "number", unsigned: true }),
    ownerId: varchar("owner_id", { length: 36 }).notNull(),
  },
  (t) => [
    index("idx_folders_parent_id").on(t.parentId),
    index("idx_folders_owner_id").on(t.ownerId),
  ],
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
