import { seedDb } from "~/server/actions";

export default function SeedPage() {
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
