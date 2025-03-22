import { Suspense } from "react";
import FoldersList from "./folders_list";
import FilesList from "./files_list";
import { FolderPlus, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import FoldersBreadcrumb from "./folders_breadcrumb";

export default async function FolderPage(props: {
  params: Promise<{ folder_id: string }>;
}) {
  const { folder_id } = await props.params;
  const folderId = Number(folder_id) || 1;

  return (
    <div className="space-y-4">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <Suspense
            fallback={
              <div className="h-6 w-32 animate-pulse rounded bg-gray-100 dark:bg-gray-800"></div>
            }
          >
            <FoldersBreadcrumb folderId={folderId} />
          </Suspense>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-300 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          Folders
        </h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-lg bg-gray-100 p-6 dark:bg-gray-800"
                ></div>
              ))}
            </div>
          }
        >
          <FoldersList folderParentId={folderId} />
        </Suspense>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          Files
        </h2>
        <Suspense
          fallback={
            <div className="grid animate-pulse grid-cols-1 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
                ></div>
              ))}
            </div>
          }
        >
          <FilesList folderParentId={folderId} />
        </Suspense>
      </div>
    </div>
  );
}
