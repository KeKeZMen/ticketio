import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { FC } from "react";

type PropsType = {
  selection: {
    id: string;
    title: string;
    createdAt: Date;
  };
};

export const SelectionCard: FC<PropsType> = ({ selection }) => {
  return (
    <div
      className="flex justify-between items-start bg-no-repeat bg-center h-[350px] w-[350px] rounded-md p-[27px] flex-col"
      style={{ backgroundImage: `url(/selections/${selection.id}.jpg)` }}
    >
      <h2 className="text-white text-2xl font-bold">{selection.title}</h2>
      <p className="font-thin text-white">
        {format(selection.createdAt, "PPP", { locale: ru })}
      </p>
    </div>
  );
};
