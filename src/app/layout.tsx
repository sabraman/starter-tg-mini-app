import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { env } from "~/env";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "TG Mini App",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Root = dynamic(() => import("~/components/common/root"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="text-muted-foreground size-8 animate-spin" />
    </div>
  ),
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Root debug={env.NODE_ENV === "development"}>{children}</Root>
      </body>
    </html>
  );
}
