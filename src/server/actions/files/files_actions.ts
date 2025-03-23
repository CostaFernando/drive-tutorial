"use server";

import { type PutBlobResult } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { createFile as createFileQuery } from "~/server/db/queries/files/create_file";
import { deleteFile as deleteFileQuery } from "~/server/db/queries/files/delete_file";

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

  await createFileQuery(
    fileBlob.pathname,
    fileBlob.contentType,
    fileBlob.url,
    folderId,
    session.user.id,
  );

  revalidatePath(`/my_drive/${folderId}`);
}

export async function deleteFile(fileId: number, folderId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  await deleteFileQuery(fileId);

  revalidatePath(`/my_drive/${folderId}`);
}
