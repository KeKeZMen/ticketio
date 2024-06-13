"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-left md:text-base md:w-full"
    >
      Выйти
    </button>
  );
};
