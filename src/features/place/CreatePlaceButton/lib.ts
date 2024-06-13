import { z } from "zod";

export const zodSchema = z.object({
  name: z.string({ message: "Поле не может быть пустым" }),
});
