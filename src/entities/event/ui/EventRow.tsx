import { Event } from "@prisma/client";
import { TableCell, TableRow } from "@shared";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FC } from "react";

type EventWithPlace = Event & { place: { name: string } };

type PropsType = {
  event: EventWithPlace;
  editButton?: JSX.Element;
  deleteButton?: JSX.Element;
};

export const EventRow: FC<PropsType> = ({
  event,
  deleteButton,
  editButton,
}) => {
  return (
    <TableRow>
      <TableCell className="min-w-[300px]">{event.name}</TableCell>
      <TableCell className="min-w-[150px]">{format(event.startTime, "PPP", { locale: ru })}</TableCell>
      <TableCell>{event.ticketsCount}</TableCell>
      <TableCell className="min-w-[150px]">{event.place.name}</TableCell>
      <TableCell>
        <div className="flex gap-3 items-center justify-center">
          {editButton}
          {deleteButton}
        </div>
      </TableCell>
    </TableRow>
  );
};
