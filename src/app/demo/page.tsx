"use client";

import { retrieveLaunchParams, viewport } from "@telegram-apps/sdk-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useMainButton } from "~/hooks/use-main-button";
import { demoAction } from "./actions";
import { Rocket, Undo2 } from "lucide-react";
import { useBackButton } from "~/hooks/use-back-button";

const handleClick = () => {
  alert("hi");

  const lp = retrieveLaunchParams();

  console.log({
    viewport: {
      h: viewport.height(),
      w: viewport.width(),
    },
    initData: lp.initData,
    themeParams: lp.themeParams,
  });
};

export default function DemoPage() {
  useMainButton(handleClick);
  useBackButton();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
      <h1 className="text-3xl font-bold">Demo</h1>

      <div className="text-muted-foreground space-y-2 text-sm">
        <p>
          This is a client-side rendered page. It activates the
          &quot;native&quot; main button provided by Telegram.{" "}
        </p>
        <p>
          The &ldquo;Authorized Action&rdquo; triggers a server action which
          returns message based on if the authentication is successful.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Undo2 className="size-4" /> Home
          </Button>
        </Link>
        <Button
          onClick={async () => {
            const result = await demoAction();
            alert(result.message);
          }}
          className="gap-2"
        >
          <Rocket className="size-4" /> Authorized Action
        </Button>
      </div>
    </div>
  );
}
