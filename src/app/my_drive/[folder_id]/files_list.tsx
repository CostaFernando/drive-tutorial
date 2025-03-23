import {
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileCode,
  FileIcon as FilePdf,
  FileArchive,
  File,
} from "lucide-react";
import { getFilesByFolderId } from "~/server/db/queries/files/get_files_by_folder_id";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import DeleteFileButton from "./delete_file_button";

function FileIcon({ type }: { type: string }) {
  const iconClass = "w-5 h-5";

  if (type.includes("image")) return <FileImage className={iconClass} />;
  if (type.includes("audio")) return <FileAudio className={iconClass} />;
  if (type.includes("video")) return <FileVideo className={iconClass} />;
  if (type.includes("pdf")) return <FilePdf className={iconClass} />;
  if (type.includes("zip") || type.includes("rar") || type.includes("tar"))
    return <FileArchive className={iconClass} />;
  if (
    type.includes("html") ||
    type.includes("css") ||
    type.includes("javascript") ||
    type.includes("json")
  )
    return <FileCode className={iconClass} />;
  if (type.includes("text")) return <FileText className={iconClass} />;

  return <File className={iconClass} />;
}

export default async function FilesList(props: { folderParentId: number }) {
  const { folderParentId } = props;

  const files = await getFilesByFolderId(folderParentId);

  if (files.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500 dark:text-gray-400">
        No files found
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <TableCell className="p-0" colSpan={3}>
                <a
                  href={file.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer p-4"
                >
                  <div className="flex w-full items-center">
                    <div className="w-12 text-blue-500 dark:text-blue-400">
                      <FileIcon type={file.type} />
                    </div>
                    <div className="font-medium">{file.name}</div>
                    <div className="ml-auto">{file.type.split("/")[1]}</div>
                  </div>
                </a>
              </TableCell>
              <TableCell className="p-2 text-right">
                <DeleteFileButton fileId={file.id} folderId={folderParentId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
