"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/react";
import "swiper/css";
import { SelectionCard } from "@entities/selection/ui";

type PropsType = {
  selections: {
    id: string;
    title: string;
    createdAt: Date;
  }[];
};

export const Selections: FC<PropsType> = ({ selections }) => {
  return (
    <Swiper style={{ width: "100%" }} slidesPerView={3} loop spaceBetween={30}>
      {selections.map((selection) => (
        <SwiperSlide key={selection.id}>
          <SelectionCard selection={selection} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
