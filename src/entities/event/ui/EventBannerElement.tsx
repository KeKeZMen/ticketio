import { Event } from "@prisma/client";
import React, { FC } from "react";

type PropsType = {
  event: Event;
};

export const EventBannerElement: FC<PropsType> = ({ event }) => {
  return <div>EventBannerElement</div>;
};
