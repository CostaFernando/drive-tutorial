"use client";

import type React from "react";

import type { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import { createFile } from "~/server/actions";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";

export default function UploadFileForm({
  folderId,
  onUploadComplete,
}: {
  folderId: number;
  onUploadComplete?: () => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      if (!inputFileRef.current?.files || !inputFileRef.current.files[0]) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const uploadName = fileName || file.name;

      const newBlob = await upload(uploadName, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      setBlob(newBlob);

      await createFile(newBlob, folderId);

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="mb-1 block text-sm font-medium">
            Select File
          </label>
          <input
            id="file"
            name="file"
            ref={inputFileRef}
            type="file"
            required
            onChange={handleFileChange}
            className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="fileName" className="mb-1 block text-sm font-medium">
            File Name (optional)
          </label>
          <input
            id="fileName"
            name="fileName"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Custom file name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </form>

      {blob && (
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
          <p className="mb-1 text-sm font-medium">Upload Complete!</p>
          <a
            href={blob.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm break-all text-blue-600 hover:underline"
          >
            {blob.url}
          </a>
        </div>
      )}
    </div>
  );
}
