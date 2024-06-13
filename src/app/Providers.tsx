"use client";

import { Toaster } from "@shared";
import { SessionProvider } from "next-auth/react";

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};
