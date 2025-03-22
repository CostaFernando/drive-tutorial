import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { getRootFolderByUserId } from "~/server/db/queries/get_root_folder_by_user_id";
import { createFolder } from "~/server/db/queries/create_folder";

export default async function MyDrive() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  async function getUserRootFolderId() {
    if (!session) {
      throw new Error("User not authenticated");
    }
    const userId = session.user.id;
    let rootFolder = await getRootFolderByUserId(userId);
    if (!rootFolder) {
      const folderName = "My Drive";
      const parentFolderId = null;
      await createFolder(folderName, parentFolderId, userId);
      rootFolder = await getRootFolderByUserId(userId);
    }

    return rootFolder?.id;
  }

  const rootFolderId = await getUserRootFolderId();
  redirect(`/my_drive/${rootFolderId}`);
}
