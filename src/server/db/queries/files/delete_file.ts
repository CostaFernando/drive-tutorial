import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { files as filesSchema } from "~/server/db/schema";

export async function deleteFile(fileId: number, folderId: number) {
  await db.delete(filesSchema).where(eq(filesSchema.id, fileId));
}
