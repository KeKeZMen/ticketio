"use client";

import { EventBannerElement } from "@entities/event/ui";
import { Event } from "@prisma/client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

type PropsType = {
  events: Event[];
};

export const Banner: FC<PropsType> = ({ events }) => {
  return (
    <Swiper
      style={{ width: "100%" }}
      slidesPerView={1}
      navigation
      modules={[Navigation]}
      loop
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <EventBannerElement event={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
