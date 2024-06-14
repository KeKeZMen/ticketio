"use server";

import { authOptions, db } from "@shared";
import { getServerSession } from "next-auth";
import { ApiError } from "@shared";

export const deletePlace = async (placeId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") throw ApiError.noEnoughRights();

    const place = await db.place.findFirst({
      where: {
        id: placeId,
      },
    });

    if (!place)
      throw ApiError.badRequest("Такого места проведения не существует");

    const events = await db.event.findMany({
      where: {
        placeId,
      },
    });

    if (events.length !== 0)
      throw ApiError.badRequest("В удаляемом месте проведения есть события");

    await db.place.delete({
      where: {
        id: placeId,
      },
    });

    return {
      data: {
        message: "Успешно удалено",
      },
    };
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
