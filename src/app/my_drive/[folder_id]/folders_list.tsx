import { getFoldersByParentId } from "~/server/db/queries/get_folders_by_parent_id";
import Link from "next/link";

export default async function FoldersList(props: { folderParentId: number }) {
  const { folderParentId } = props;

  const folders = await getFoldersByParentId(folderParentId);

  return (
    <div className="flex flex-col gap-4">
      {folders.map((folder) => (
        <div key={folder.id} className="flex items-center gap-2">
          <Link
            href={`/my_drive/${folder.id}`}
            className="text-blue-500 hover:underline"
          >
            {folder.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
