import { Event } from "@prisma/client";
import { format } from "date-fns";
import React, { FC } from "react";
import { ru } from "date-fns/locale";
import Link from "next/link";

type PropsType = {
  event: Event;
};

export const EventBannerElement: FC<PropsType> = ({ event }) => {
  return (
    <div
      style={{ backgroundImage: `url(/events/${event.id}.jpg)` }}
      className="bg-center bg-no-repeat bg-cover w-full h-[525px] rounded-md flex justify-between flex-col p-[46px] text-white items-end relative"
    >
      <div className="flex flex-col gap-1 items-end">
        <h2 className="text-2xl">Концерт</h2>
        <p className="text-xl">
          {format(event.startTime, "PPP", { locale: ru })}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-3 items-end">
        <h2 className="font-bold text-4xl">{event.name}</h2>
        <p className="text-2xl max-w-[700px] text-right">{event.description}</p>
      </div>

      <Link
        href={`/event/${event.id}`}
        className="px-[26px] py-[12px] bg-white text-black rounded-md font-bold"
      >
        Купить билет
      </Link>
    </div>
  );
};
