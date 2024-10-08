"use client";

import {
  backButton,
  init,
  isTMA,
  mainButton,
  miniApp,
  settingsButton,
  themeParams,
  useLaunchParams,
  useSignal,
  viewport,
} from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { AuthProvider, useAuth } from "./auth";
import Loader from "./loader";
import { ThemeProvider } from "./theme-provider";
import { Rocket, TriangleAlert } from "lucide-react";

export default function Root({
  children,
  debug,
}: {
  children: React.ReactNode;
  debug: boolean;
}) {
  const [tma, setTMA] = useState<"loading" | "tma" | "web">("loading");
  useEffect(() => {
    void isTMA().then((isTMA) => {
      setTMA(isTMA ? "tma" : "web");
    });
  });

  switch (tma) {
    case "loading":
      return <Loader />;
    case "tma":
      return <MiniApp debug={debug}>{children}</MiniApp>;
    case "web":
      return <NonTgView />;
  }
}

export function MiniApp({
  children,
  debug,
}: {
  children: React.ReactNode;
  debug: boolean;
}) {
  const isDark = useSignal(miniApp.isDark);

  const manifestUrl = useMemo(() => {
    return typeof window !== "undefined"
      ? new URL("tonconnect-manifest.json", window.location.href).toString()
      : "";
  }, []);

  const router = useRouter();

  const openSettings = useCallback(() => {
    router.push("/settings");
  }, [router]);

  useEffect(() => {
    init();

    miniApp.mount();
    themeParams.mount();
    backButton.mount();
    mainButton.mount();

    if (!miniApp.isCssVarsBound()) {
      miniApp.bindCssVars();
    }

    if (!themeParams.isCssVarsBound()) {
      themeParams.bindCssVars();
    }

    if (!viewport.isMounted() && !viewport.isMounting()) {
      void viewport.mount().then(() => {
        viewport.bindCssVars();
        if (!viewport.isExpanded()) {
          viewport.expand();
        }
      });
    }

    settingsButton.mount();
    settingsButton.onClick(openSettings);
    settingsButton.show();

    miniApp.ready();

    return () => {
      settingsButton.hide();
      settingsButton.offClick(openSettings);
    };
  }, [openSettings]);

  useEffect(() => {
    if (debug) {
      void import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={isDark ? "dark" : "light"}
      enableSystem={false}
      disableTransitionOnChange
    >
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <AuthProvider>
          <AppContent>{children}</AppContent>
          {debug && <DebugInfo />}
        </AuthProvider>
      </TonConnectUIProvider>
    </ThemeProvider>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Loader className="text-primary" />;
  }

  return <>{children}</>;
}

function DebugInfo() {
  const { initData, themeParams, startParam } = useLaunchParams();

  useEffect(() => {
    setTimeout(
      () =>
        console.log({
          initData,
          themeParams,
          startParam,
          viewport: {
            height: viewport.height(),
            width: viewport.width(),
          },
        }),
      2000,
    );
  }, [initData, startParam, themeParams]);

  return <></>;
}

function NonTgView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      <div className="space-y-4">
        <TriangleAlert className="text-primary mx-auto size-16" />
        <p className="text-muted-foreground">
          This app is only available in Telegram
        </p>
      </div>

      <Link href={env.NEXT_PUBLIC_TG_APP_URL}>
        <Button className="gap-2" size="lg">
          <Rocket className="size-5" />
          Open App in Telegram
        </Button>
      </Link>
    </div>
  );
}
