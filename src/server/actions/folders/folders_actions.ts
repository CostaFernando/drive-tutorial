"use server";

import { revalidatePath } from "next/cache";
import { createFolder as createFolderQuery } from "~/server/db/queries/folders/create_folder";
import { deleteFolder as deleteFolderQuery } from "~/server/db/queries/folders/delete_folder";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

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

  if (parentFolderId) {
    revalidatePath(`/my_drive/${parentFolderId}`);
  }
}

export async function deleteFolder(
  folderId: number,
  parentFolderId: number,
): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await deleteFolderQuery(folderId);

  revalidatePath(`/my_drive/${parentFolderId}`);
}
