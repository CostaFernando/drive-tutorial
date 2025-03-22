"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { createFolder } from "~/server/actions/folders/folders_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewFolderButton({ folderId }: { folderId: number }) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setIsLoading(true);
    try {
      await createFolder(folderName, folderId);
      setOpen(false);
      setFolderName("");
      toast.success("Folder created successfully");
      router.refresh();
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => setOpen(true)}
      >
        <FolderPlus className="mr-2 h-4 w-4" />
        New Folder
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-200">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Enter a name for your new folder
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name"
                className="mt-1"
                disabled={isLoading}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !folderName.trim()}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
