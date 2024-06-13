"use server";

import { ApiError, authOptions, db } from "@shared";
import { getServerSession } from "next-auth";
import { zodSchema } from "./lib";
import { z } from "zod";

export const createPlace = async (
  state: any,
  values: z.infer<typeof zodSchema>
) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") throw ApiError.noEnoughRights();

    const validation = zodSchema.safeParse({
      name: values.name,
    });

    if (validation.success) {
      await db.place.create({
        data: {
          name: values.name,
        },
      });

      return {
        data: {
          message: "Успешно создано",
        },
      };
    } else {
      throw ApiError.badRequest(
        validation.error.issues.map((issue) => issue.message).join("\n")
      );
    }
  } catch (error) {
    return {
      error: {
        message: String(
          error instanceof ApiError ? error.message : "Ошибка сервера"
        ),
      },
    };
  }
};
