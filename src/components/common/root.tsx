"use client";

import {
  miniApp,
  useSignal,
  init,
  backButton,
  settingsButton,
  mainButton,
  useLaunchParams,
  themeParams,
  viewport,
} from "@telegram-apps/sdk-react";
import { ThemeProvider } from "./theme-provider";
import { useCallback, useEffect, useMemo } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AuthProvider, useAuth } from "./auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Root({
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
    <ThemeProvider enableSystem defaultTheme={isDark ? "dark" : "light"}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <AuthProvider>
          <App>{children}</App>
          {debug && <DebugInfo />}
        </AuthProvider>
      </TonConnectUIProvider>
    </ThemeProvider>
  );
}

function App({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    );
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
