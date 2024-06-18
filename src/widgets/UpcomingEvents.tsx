"use client";

import { EventCard } from "@entities/event/ui";
import { Event } from "@prisma/client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

interface IEventWithPlace extends Event {
  place: {
    name: string;
  };
}

type PropsType = {
  events: IEventWithPlace[];
};

export const UpcomingEvents: FC<PropsType> = ({ events }) => {
  return (
    <Swiper
      style={{ width: "100%" }}
      slidesPerView={3}
      navigation
      spaceBetween={30}
      modules={[Navigation]}
      loop
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <EventCard event={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
