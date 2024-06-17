"use client";

import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared";
import { User } from "next-auth";
import { FC } from "react";

type PropsType = {
  user: User;
  LogoutButton?: JSX.Element;
};

export const UserProfile: FC<PropsType> = ({ user, LogoutButton }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-col items-center md:p-3">
        <Avatar>
          <AvatarImage
            src={
              user.image ??
              `https://avatar.iran.liara.run/public/${
                Math.floor(Math.random() * 10) + 1
              }`
            }
          />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-[101]">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex justify-start p-2">
          {LogoutButton}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
