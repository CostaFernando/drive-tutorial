import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import React from "react";

import { getFolderInfoWithParents } from "~/server/db/queries/get_folder_by_id";

export default async function FoldersBreadcrumb(props: { folderId: number }) {
  const { folderId } = props;

  const folderParents = await getFolderInfoWithParents(folderId);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {folderParents.map((folder, index) => (
          <React.Fragment key={folder.id}>
            {index > 0 && (
              <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600" />
            )}
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/my_drive/${folder.id}`}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {folder.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
