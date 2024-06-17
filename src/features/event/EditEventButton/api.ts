"use server";

import { z } from "zod";
import { zodSchema } from "./lib";
import { ApiError, authOptions, db } from "@shared";
import { getServerSession } from "next-auth";
import { writeFile } from "fs/promises";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";

const DIR_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../public/events"
);

export const editEvent = async (
  state: any,
  { values, eventId }: { values: z.infer<typeof zodSchema>; eventId: number }
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

      const existedEvent = await db.event.findFirst({
        where: {
          id: eventId,
        },
      });

      if (!existedEvent) throw ApiError.badRequest("Событие не существует");

      const event = await db.event.update({
        where: {
          id: eventId,
        },
        data: {
          name: validation.data.name,
          placeId: +validation.data.placeId,
          startTime: validation.data.startTime,
          ticketsCount: validation.data.ticketsCount,
        },
      });

      const fileBuffer = Buffer.from(validation.data.preview);
      const filePath = join(DIR_PATH, `/${event.id}.jpg`);      

      await writeFile(filePath, fileBuffer, { flag: "w" });

      return {
        data: {
          message: "Успешно отредактировано",
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
          /* error instanceof ApiError ?  */error/* .message : "Ошибка сервера" */
        ),
      },
    };
  }
};
