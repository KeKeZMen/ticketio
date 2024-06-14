import { EventRow } from "@entities/event/ui";
import { CreateEventButton } from "@features/event/CreateEventButton";
import { DeleteEventButton } from "@features/event/DeleteEventButton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  db,
} from "@shared";

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
    <div className="flex justify-between flex-col gap-3 border rounded-md pt-3">
      <div className="flex justify-between items-center px-3">
        <h2 className="font-bold">Мероприятия</h2>
        <CreateEventButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-3">Название</TableHead>
            <TableHead>Дата начала</TableHead>
            <TableHead>Количество билетов</TableHead>
            <TableHead>Место</TableHead>
            <TableHead className="w-[5%] pr-3">Действия</TableHead>
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
