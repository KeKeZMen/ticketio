import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface DefaultUser {
    id: number;
    role: Role;
  }

  interface User {
    id: number;
    role: Role;
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}
