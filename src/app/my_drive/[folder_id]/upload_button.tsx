"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import UploadFile from "./upload_file";

export default function UploadButton({ folderId }: { folderId: number }) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={() => setIsUploadDialogOpen(true)}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>

      {isUploadDialogOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg dark:bg-gray-800">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-medium">Upload File</h3>
              <button
                onClick={() => setIsUploadDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <UploadFile
                folderId={folderId}
                onUploadComplete={() => setIsUploadDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
