import { EventRow } from "@entities/event/ui/EventRow";
import { CreateEventButton } from "@features/event/CreateEventButton";
import { DeleteEventButton } from "@features/event/DeleteEventButton/ui";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  db,
} from "@shared";
import React from "react";

export const EventsTable = async () => {
  const events = await db.event.findMany({
    select: {
      id: true,
      name: true,
      place: {
        select: {
          name: true,
        },
      },
      startTime: true,
      ticketsCount: true,
      placeId: true,
    },
  });

  return (
    <div className="flex justify-between flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2>Мероприятия</h2>
        <CreateEventButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Дата начала</TableHead>
            <TableHead>Количество билетов</TableHead>
            <TableHead>Место</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <EventRow
              event={event}
              key={event.id}
              deleteButton={<DeleteEventButton eventId={event.id} />}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
