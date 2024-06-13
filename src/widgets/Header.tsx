"use client";

import React from "react";
import { Nav } from "./Nav";
import { Menu } from "./Menu";
import Link from "next/link";
import { LoginButton } from "@features/auth/LoginButton";
import { useSession } from "next-auth/react";
import { UserProfile } from "@entities/user/ui/UserProfile";
import { LogoutButton } from "@features/auth/LogoutButton";

export const Header = () => {
  const { data } = useSession();

  return (
    <header className="p-5">
      <div className="lg:container flex justify-between items-center">
        <Link className="text-[2em]" href="/">
          Ticket.io
        </Link>

        <div className="flex justify-end items-center gap-3">
          <div className="hidden md:flex justify-between items-center gap-3">
            <Nav />
          </div>

          {data?.user ? (
            <UserProfile user={data.user} LogoutButton={<LogoutButton />} />
          ) : (
            <LoginButton />
          )}

          <div className="flex md:hidden">
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
};
