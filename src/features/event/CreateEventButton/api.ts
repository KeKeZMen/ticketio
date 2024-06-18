"use server";

import { authOptions, db, ApiError } from "@shared";
import { getServerSession } from "next-auth";
import { zodSchema } from "./lib";
import { writeFile } from "fs/promises";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const DIR_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../public/events"
);

export const createEvent = async (state: any, data: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") throw ApiError.noEnoughRights();

    const formData = Object.fromEntries(data);
    const validation = zodSchema.safeParse(formData);

    if (validation.success) {
      const places = await db.place.findMany();

      if (!places.some((place) => place.id === validation.data.placeId))
        throw ApiError.badRequest("Выбрано несуществующее место проведения");

      const event = await db.event.create({
        data: {
          name: validation.data.name,
          placeId: +validation.data.placeId,
          startTime: new Date(validation.data.startTime),
          ticketsCount: validation.data.ticketsCount,
        },
      });

      const file = validation.data.preview as File;
      const filePath = join(DIR_PATH, `/${event.id}.jpg`);
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, fileBuffer);

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
