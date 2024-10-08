import { Cherry } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
      <h1 className="text-3xl font-bold">Hello world!</h1>

      <p className="text-muted-foreground w-full">
        This is a server-side rendered page. This page does not trigger any
        telegram specific functionalities.
      </p>

      <Link href="/demo">
        <Button className="gap-2">
          <Cherry className="size-4" /> Go to Demo Page
        </Button>
      </Link>
    </main>
  );
}
