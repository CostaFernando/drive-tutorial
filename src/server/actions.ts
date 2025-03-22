"use server";

import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { type PutBlobResult } from "@vercel/blob";

export async function createFile(
  fileBlob: PutBlobResult,
  folderId: number,
  ownerId: string,
): Promise<void> {
  await db.insert(filesSchema).values({
    name: fileBlob.pathname,
    type: fileBlob.contentType,
    url: fileBlob.url,
    folderId: folderId,
    ownerId: ownerId,
  });
}

export async function seedDb() {
  const insertedFiles = await db.insert(filesSchema).values(
    mockFiles.map((file, index) => ({
      id: index + 1,
      name: file.name,
      type: file.type,
      folderId: (index % 3) + 1,
      ownerId: "1",
    })),
  );

  console.log("Inserted files:", insertedFiles);

  const insertedFolders = await db.insert(foldersSchema).values(
    mockFolders.map((folder, index) => ({
      id: index + 1,
      name: folder.name,
      parentId: folder.parent ? parseInt(folder.parent) : null,
      ownerId: "1",
    })),
  );
  console.log("Inserted folders:", insertedFolders);
}
