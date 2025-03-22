"use server";

import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { type PutBlobResult } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { createFolder as createFolderQuery } from "~/server/db/queries/folders/create_folder";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

export async function createFile(
  fileBlob: PutBlobResult,
  folderId: number,
): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await db.insert(filesSchema).values({
    name: fileBlob.pathname,
    type: fileBlob.contentType,
    url: fileBlob.url,
    folderId: folderId,
    ownerId: session.user.id,
  });

  revalidatePath(`/my_drive/${folderId}`);
}

export async function createFolder(
  folderName: string,
  parentFolderId: number | null,
): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await createFolderQuery(folderName, parentFolderId, session.user.id);

  revalidatePath(`/my_drive/${parentFolderId}`);
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
