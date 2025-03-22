import { db } from "~/server/db";
import { folders as foldersSchema } from "~/server/db/schema";

export async function createFolder(
  folderName: string,
  parentFolderId: number | null,
  userId: string,
): Promise<void> {
  await db.insert(foldersSchema).values({
    name: folderName,
    parentId: parentFolderId,
    ownerId: userId,
  });
}
