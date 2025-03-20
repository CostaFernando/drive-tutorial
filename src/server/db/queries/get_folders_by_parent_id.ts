import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { folders as foldersSchema } from "~/server/db/schema";

export const getFoldersByParentId = async (parentId: number) => {
  const folders = await db
    .select({
      id: foldersSchema.id,
      name: foldersSchema.name,
    })
    .from(foldersSchema)
    .where(eq(foldersSchema.parentId, parentId))
    .orderBy(foldersSchema.name);

  return folders;
};
