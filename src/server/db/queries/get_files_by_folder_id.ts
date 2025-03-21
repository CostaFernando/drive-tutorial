import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { files as filesSchema } from "~/server/db/schema";

export const getFilesByFolderId = async (folderId: number) => {
  const files = await db
    .select({
      id: filesSchema.id,
      name: filesSchema.name,
      type: filesSchema.type,
      size: filesSchema.size,
    })
    .from(filesSchema)
    .where(eq(filesSchema.folderId, folderId))
    .orderBy(filesSchema.name);

  return files;
};
