import { mockFolders, mockFiles } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default function Seed() {
  async function seedDb() {
    "use server";

    const insertedFiles = await db.insert(files).values(
      mockFiles.map((file, index) => ({
        id: index + 1,
        name: file.name,
        type: file.type,
        folderId: (index % 3) + 1,
        size: parseInt(file.size),
        ownerId: 1,
      })),
    );

    console.log("Inserted files:", insertedFiles);

    const insertedFolders = await db.insert(folders).values(
      mockFolders.map((folder, index) => ({
        id: index + 1,
        name: folder.name,
        parentId: folder.parent ? parseInt(folder.parent) : null,
        ownerId: 1,
      })),
    );
    console.log("Inserted folders:", insertedFolders);
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <form action={seedDb}>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Seed Database</h1>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Seed
            </button>
          </div>
          <p className="text-gray-300">
            This will insert mock data into the database.
          </p>
        </form>
      </div>
    </div>
  );
}
