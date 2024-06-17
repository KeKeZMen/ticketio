import { z } from "zod";

export const zodSchema = z.object({
  name: z.string({ message: "Поле не может быть пустым" }),
  ticketsCount: z.coerce
    .number({
      message: "Неверный формат количества билетов",
    })
    .min(1, { message: "Количество билетов не может быть меньше 1" }),
  placeId: z.coerce.number({ message: "Неверно выбрано место проведения" }),
  startTime: z.date({ message: "Неверно выбрана дата проведения" }),
});
