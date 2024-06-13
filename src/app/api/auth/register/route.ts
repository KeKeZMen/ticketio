import { createHash } from "crypto";
import { db } from "@shared";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };

    const hashedPassword = createHash("sha256").update(password).digest("hex");

    const user = await db.user.create({
      data: {
        name,
        password: hashedPassword,
        email: email.toLowerCase(),
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
