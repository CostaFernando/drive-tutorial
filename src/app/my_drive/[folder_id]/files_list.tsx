import { getFilesByFolderId } from "~/server/db/queries/get_files_by_folder_id";

export default async function FilesList(props: { folderParentId: number }) {
  const { folderParentId } = props;
  const files = await getFilesByFolderId(folderParentId);

  return (
    <div className="flex flex-col gap-4">
      {files.map((file) => (
        <div key={file.id} className="flex items-center gap-2">
          <span className="text-blue-500">{file.name}</span>
          <span className="text-gray-500">({file.size} bytes)</span>
          <span className="text-gray-500">[{file.type}]</span>
        </div>
      ))}
    </div>
  );
}
