import FoldersList from "./folders_list";
import FilesList from "./files_list";
import { Suspense } from "react";

export default async function FolderPage(props: {
  params: Promise<{ folder_id: string }>;
}) {
  const { folder_id } = await props.params;
  const folderParentId = Number(folder_id) || 0;

  return (
    <div className="flex min-h-screen flex-col p-24">
      <h1 className="text-4xl font-bold">Meus arquivos</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <FoldersList folderParentId={folderParentId} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <FilesList folderParentId={folderParentId} />
      </Suspense>
    </div>
  );
}
