import { auth } from "~/lib/auth";
import { Button } from "~/components/ui/button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyDriveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Google Drive Clone
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {session?.user?.name}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </span>
            <img
              src={session?.user?.image || "/placeholder.svg"}
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });

                redirect("/");
              }}
            >
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                type="submit"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
