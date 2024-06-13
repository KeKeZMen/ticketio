"use client";

import { placeFetcher } from "@entities/place/api";
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  cn,
} from "@shared";
import { CalendarIcon, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { createEvent } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodSchema } from "./lib";

export const CreateEventButton = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);
  const router = useRouter();

  const [state, formAction] = useFormState(createEvent, null);
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof zodSchema>> = async (
    values: z.infer<typeof zodSchema>
  ) => {
    formAction(values);
  };

  const { data: places, isLoading: isLoadingPlaces } = useSWR(
    "/api/place",
    placeFetcher
  );

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
        <Plus />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={onClose} modal>
        <DialogContent>
          <DialogTitle>Добавить мероприятие</DialogTitle>
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

              <FormField
                control={form.control}
                name="ticketsCount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Количество билетов</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Количество билетов"
                        type="number"
                        {...field}
                        disabled={form.formState.isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isLoadingPlaces ? (
                <FormField
                  control={form.control}
                  name="placeId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Место проведения</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Место проведения" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {places?.map((place) => (
                            <SelectItem value={String(place.id)} key={place.id}>
                              {place.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="flex flex-col justify-center w-full">
                  <Skeleton className="h-[20px] w-[131px]" />
                  <Skeleton className="h-[40px] w-full mt-[8px]" />
                </div>
              )}

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Дата проведения</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ru })
                            ) : (
                              <span>Выберите дату</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Создать</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
