import { Event } from "@prisma/client";
import { Button } from "@shared";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { FC } from "react";

interface IEventWithPlace extends Event {
  place: {
    name: string;
  };
}

type PropsType = {
  event: IEventWithPlace;
};

export const EventCard: FC<PropsType> = ({ event }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <img
        src={`/events/${event.id}.jpg`}
        alt=""
        className="rounded-md shadow-lg w-full"
      />

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{event.name}</h2>
          <p className="text-[#868686]">
            {format(event.startTime, "PPP", { locale: ru })} |{" "}
            {event.place.name}
          </p>
        </div>

        <Button>От {event.ticketCost}₽</Button>
      </div>
    </div>
  );
};
