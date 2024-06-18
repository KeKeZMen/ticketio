import { z } from "zod";

export const zodSchema = z.object({
  name: z.string({ message: "Поле не может быть пустым" }),
  ticketsCount: z.coerce
    .number({
      message: "Поле не может быть пустым",
    })
    .min(1, { message: "Количество билетов не может быть меньше 1" }),
  placeId: z.coerce.number({ message: "Не выбрано место проведения" }),
  startTime: z.any().refine((date) => new Date(date), {
    message: "Неверно выбрано время проведения",
  }),
  ticketCost: z.coerce.number({ message: "Поле не может быть пустым" }),
  preview: z.any(),
});
