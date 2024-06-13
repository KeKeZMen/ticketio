"use server";

import { authOptions, db, ApiError } from "@shared";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { zodSchema } from "./lib";

export const createEvent = async (
  state: any,
  values: z.infer<typeof zodSchema>
) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") throw ApiError.noEnoughRights();

    const validation = zodSchema.safeParse({
      name: values.name,
      ticketsCount: values.ticketsCount,
      placeId: values.placeId,
      startTime: values.startTime,
    });

    if (validation.success) {
      const places = await db.place.findMany();

      if (!places.some((place) => place.id === validation.data.placeId))
        throw ApiError.badRequest("Выбрано несуществующее место проведения");

      await db.event.create({
        data: {
          name: validation.data.name,
          placeId: +validation.data.placeId,
          startTime: validation.data.startTime,
          ticketsCount: validation.data.ticketsCount,
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
