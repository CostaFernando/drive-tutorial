"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { deleteFolder } from "~/server/actions/folders/folders_actions";

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="ghost"
      size="sm"
      type="submit"
      disabled={pending}
      className="text-red-500 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}

export default function DeleteFolderButton({
  folderId,
  parentFolderId,
}: {
  folderId: number;
  parentFolderId: number;
}) {
  const deleteFolderWithId = deleteFolder.bind(null, folderId, parentFolderId);

  return (
    <form
      action={deleteFolderWithId}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this folder?")) {
          e.preventDefault();
        }
      }}
    >
      <DeleteButton />
    </form>
  );
}
