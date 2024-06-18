"use server";

import { ApiError, authOptions, db } from "@shared";
import { unlink } from "fs/promises";
import { getServerSession } from "next-auth";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const DIR_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../public/events"
);

export const deleteEvent = async (eventId: string) => {
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

    const filePath = join(DIR_PATH, `/${event.id}.jpg`);
    await unlink(filePath);

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
