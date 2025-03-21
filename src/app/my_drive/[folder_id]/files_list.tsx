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
import { Card, CardContent } from "~/components/ui/card";
import { getFilesByFolderId } from "~/server/db/queries/get_files_by_folder_id";

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

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
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
    <div className="space-y-3">
      {files.map((file) => (
        <Card
          key={file.id}
          className="transition-shadow duration-200 hover:shadow-sm"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-blue-500">
                <FileIcon type={file.type} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-gray-800 dark:text-gray-200">
                  {file.name}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{file.type.split("/")[1]}</span>
                  <span>•</span>
                  <span>{formatFileSize(file.size)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
