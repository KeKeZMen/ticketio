import { Event } from "@prisma/client";
import React, { FC } from "react";

type PropsType = {
  event: Event;
};

export const EventCard: FC<PropsType> = ({ event }) => {
  return <div></div>;
};
