import { db } from "~/server/db";
import { eq, and, isNull } from "drizzle-orm";
import { folders as foldersSchema } from "~/server/db/schema";

export async function getRootFolderByUserId(userId: string) {
  const rootFolder = await db
    .select({
      id: foldersSchema.id,
      name: foldersSchema.name,
    })
    .from(foldersSchema)
    .where(
      and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parentId)),
    )
    .limit(1);

  if (rootFolder.length === 0) {
    return null;
  }
  return rootFolder[0];
}
