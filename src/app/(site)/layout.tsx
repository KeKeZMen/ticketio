import { Header } from "@widgets/Header";
import React from "react";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="md:container mb-10">{children}</main>
    </>
  );
}
