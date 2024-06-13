"use client";

import {
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shared";
import React from "react";
import { MenuIcon } from "lucide-react";
import { Nav } from "./Nav";

export const Menu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon height={40} width={40} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ticket.io</SheetTitle>
        </SheetHeader>
        <Separator className="my-3" />
        <Nav />
        <Separator className="my-3" />
      </SheetContent>
    </Sheet>
  );
};
