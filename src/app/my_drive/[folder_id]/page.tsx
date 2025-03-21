import { Suspense } from "react";
import FoldersList from "./folders_list";
import FilesList from "./files_list";
import { ChevronLeft, FolderPlus, Upload, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import FoldersBreadcrumb from "./folders_breadcrumb";

export default async function FolderPage(props: {
  params: Promise<{ folder_id: string }>;
}) {
  const { folder_id } = await props.params;
  const folderParentId = Number(folder_id) || 0;

  const isRoot = folderParentId === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Google Drive Clone
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <MoreHorizontal className="mr-2 h-4 w-4" />
              More
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center">
            {!isRoot && (
              <Link
                href={`/my_drive/${folderParentId > 0 ? folderParentId - 1 : 0}`}
                className="mr-3"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Suspense
              fallback={
                <div className="h-6 w-32 animate-pulse rounded bg-gray-100 dark:bg-gray-800"></div>
              }
            >
              <FoldersBreadcrumb folderId={folderParentId} />
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
            <FoldersList folderParentId={folderParentId} />
          </Suspense>
        </div>

        {/* Files section */}
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
            <FilesList folderParentId={folderParentId} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
