"use client";

import dynamic from "next/dynamic";
import Loader from "./loader";

// Dynamically import the Root component with ssr: false
const DynamicRoot = dynamic(() => import("./root"), {
  ssr: false,
  loading: () => <Loader />,
});

// Client wrapper component that can be imported in layout.tsx
export default function ClientRoot({
  children,
  debug = false,
}: {
  children: React.ReactNode;
  debug?: boolean;
}) {
  return <DynamicRoot debug={debug}>{children}</DynamicRoot>;
} 