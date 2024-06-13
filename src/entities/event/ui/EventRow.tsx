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
      <TableCell>{event.name}</TableCell>
      <TableCell>{format(event.startTime, "PPP", { locale: ru })}</TableCell>
      <TableCell>{event.ticketsCount}</TableCell>
      <TableCell>{event.place.name}</TableCell>
      <TableCell>
        {editButton}
        {deleteButton}
      </TableCell>
    </TableRow>
  );
};
