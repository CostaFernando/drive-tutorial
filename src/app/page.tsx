import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <p className="mt-4 text-lg">This is a simple authentication demo.</p>
      <Button className="mt-8">
        <Link href="/sign_in">Sign In</Link>
      </Button>
    </div>
  );
}
