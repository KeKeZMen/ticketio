"use server";

import { ApiError, authOptions, db } from "@shared";
import { getServerSession } from "next-auth";

export const deleteEvent = async (eventId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") throw ApiError.noEnoughRights();

    const event = await db.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!event) throw ApiError.badRequest("Такого мероприятия не существует");

    await db.event.delete({
      where: {
        id: eventId,
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
