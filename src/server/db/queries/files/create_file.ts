import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { files as filesSchema } from "~/server/db/schema";

export async function createFile(
  name: string,
  type: string,
  url: string,
  folderId: number,
  ownerId: string,
): Promise<void> {
  await db.insert(filesSchema).values({
    name,
    type,
    url,
    folderId,
    ownerId,
  });
}
