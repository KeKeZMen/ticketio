"use server";

import { z } from "zod";
import { zodSchema } from "./lib";
import { getServerSession } from "next-auth";
import { ApiError, authOptions, db } from "@shared";

export const editPlaceButton = async (
  state: any,
  { values, placeId }: { values: z.infer<typeof zodSchema>; placeId: number }
) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") throw ApiError.noEnoughRights();

    const validation = zodSchema.safeParse({
      name: values.name,
    });

    if (validation.success) {
      await db.place.update({
        where: {
          id: placeId,
        },
        data: {
          name: values.name,
        },
      });

      return {
        data: {
          message: "Успешно изменено",
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
