import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { folders as foldersSchema } from "~/server/db/schema";

export async function deleteFolder(folderId: number): Promise<void> {
  await db.delete(foldersSchema).where(eq(foldersSchema.id, folderId));
}
