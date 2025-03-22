import Link from "next/link";
import { Folder } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { getFoldersByParentId } from "~/server/db/queries/folders/get_folders_by_parent_id";

export default async function FoldersList(props: { folderParentId: number }) {
  const { folderParentId } = props;

  const folders = await getFoldersByParentId(folderParentId);

  if (folders.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500 dark:text-gray-400">
        No folders found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {folders.map((folder) => (
        <Link key={folder.id} href={`/my_drive/${folder.id}`}>
          <Card className="h-full cursor-pointer border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center text-blue-500 dark:text-blue-400">
                <Folder className="h-12 w-12" />
              </div>
              <span className="max-w-full truncate font-medium text-gray-800 dark:text-gray-200">
                {folder.name}
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
