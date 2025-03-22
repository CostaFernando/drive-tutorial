"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import UploadFile from "./upload_file";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function UploadFileDialog({ folderId }: { folderId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Select a file to upload to this folder.
          </DialogDescription>
        </DialogHeader>
        <UploadFile
          folderId={folderId}
          onUploadComplete={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
