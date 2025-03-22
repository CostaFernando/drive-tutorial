import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import React from "react";

import { getFolderInfoWithParents } from "~/server/db/queries/folders/get_folder_by_id";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function FoldersBreadcrumb(props: { folderId: number }) {
  const { folderId } = props;

  const folderAndParents = await getFolderInfoWithParents(folderId);
  if (!folderAndParents || folderAndParents.length === 0) {
    return null;
  }
  const currentFolder = folderAndParents[folderAndParents.length - 1];
  const isRoot = currentFolder?.parentId === null;

  return (
    <div className="flex items-center">
      {!isRoot && (
        <Link href={`/my_drive/${currentFolder?.parentId}`} className="mr-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
      )}
      <Breadcrumb>
        <BreadcrumbList>
          {folderAndParents.map((folder, index) => (
            <React.Fragment key={folder.id}>
              {index > 0 && (
                <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600" />
              )}
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <Link href={`/my_drive/${folder.id}`}>{folder.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
