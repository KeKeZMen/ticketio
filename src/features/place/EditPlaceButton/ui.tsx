"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Form,
  Button,
} from "@shared";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, FC } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { editPlace } from "./api";
import { zodSchema } from "./lib";
import { Place } from "@prisma/client";

type PropsType = {
  place: Place;
};

export const EditPlaceButton: FC<PropsType> = ({ place }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);
  const router = useRouter();

  const [state, formAction] = useFormState(editPlace, null);
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: place.name,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof zodSchema>> = async (
    values: z.infer<typeof zodSchema>
  ) => {
    formAction({ values, placeId: place.id });
  };

  useEffect(() => {
    if (state?.data?.message) {
      toast.success(state?.data?.message);
      router.refresh();
    } else if (state?.error?.message) {
      toast.error(state?.error?.message);
    }
    onClose();
  }, [state]);

  return (
    <>
      <button onClick={handleModal}>
        <Edit />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={onClose} modal>
        <DialogContent>
          <DialogTitle>Отредактировать место проведения</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Название"
                        type="text"
                        {...field}
                        disabled={form.formState.isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Отредактировать</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
