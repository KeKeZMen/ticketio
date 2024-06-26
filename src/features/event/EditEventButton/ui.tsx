"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Dialog,
  DialogContent,
  DialogTitle,
  Form,
  Button,
  Input,
  Select,
  FormControl,
  SelectTrigger,
  SelectValue,
  SelectContent,
  Skeleton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SelectItem,
  cn,
  Calendar,
  Textarea,
} from "@shared";
import { CalendarIcon, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, FC, useCallback, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { editEvent } from "./api";
import { zodSchema } from "./lib";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { placeFetcher } from "@entities/place/api";
import useSWR from "swr";
import { Event } from "@prisma/client";
import clsx from "clsx";

type PropsType = {
  event: Event;
};

export const EditEventButton: FC<PropsType> = ({ event }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);
  const router = useRouter();

  const [state, formAction] = useFormState(editEvent, null);
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      placeId: event.placeId,
      startTime: event.startTime,
      name: event.name,
      ticketsCount: event.ticketsCount,
      description: event.description ?? "",
      ticketCost: event.ticketCost,
    },
  });

  const { data: places, isLoading: isLoadingPlaces } = useSWR(
    "/api/place",
    placeFetcher
  );

  const onSubmit: SubmitHandler<z.infer<typeof zodSchema>> = async (
    values: z.infer<typeof zodSchema>
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("ticketsCount", JSON.stringify(values.ticketsCount));
    formData.append("ticketCost", JSON.stringify(values.ticketCost));
    formData.append("placeId", JSON.stringify(values.placeId));
    formData.append("description", JSON.stringify(values.description));
    formData.append("startTime", new Date(values.startTime).toUTCString());
    formData.append("preview", values.preview[0]);
    formAction({ data: formData, eventId: event.id });
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

  const fileRef = form.register("preview");
  const [selectedImage, setSelectedImage] = useState(`/events/${event.id}.jpg`);
  const getFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  }, []);

  return (
    <>
      <button onClick={handleModal}>
        <Edit />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={onClose} modal>
        <DialogContent>
          <DialogTitle>Добавить мероприятие</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-3 flex-col"
            >
              <div className="flex flex-col md:flex-row gap-3 justify-start">
                <div className="flex flex-col justify-between gap-3 items-center">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <Input
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
                            type="number"
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
                    name="ticketCost"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Стоимость билетов в ₽</FormLabel>
                        <FormControl>
                          <Input
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
                                <SelectItem
                                  value={String(place.id)}
                                  key={place.id}
                                >
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
                                {field.value &&
                                  format(field.value, "PPP", { locale: ru })}
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
                </div>

                <div className="flex flex-col justify-between gap-3 items-center">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Описание события</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={form.formState.isLoading}
                            className="resize-none w-full h-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3">
                    <FormField
                      control={form.control}
                      name="preview"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Превью мероприятия</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              {...fileRef}
                              disabled={form.formState.isLoading}
                              onChange={(e) => {
                                field.onChange(e);
                                getFile(e);
                              }}
                              accept="image/jpeg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                      }}
                      className={clsx(
                        "h-[150px] bg-center bg-cover bg-no-repeat w-full",
                        !selectedImage &&
                          "border-2 border-dotted flex justify-center items-center"
                      )}
                    >
                      {!selectedImage && <span>Выберите изображение</span>}
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit">Отредактировать</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
