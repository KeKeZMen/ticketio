import { PlaceRow } from "@entities/place/ui";
import { CreatePlaceButton } from "@features/place/CreatePlaceButton";
import { DeletePlaceButton } from "@features/place/DeletePlaceButton";
import { EditPlaceButton } from "@features/place/EditPlaceButton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  db,
} from "@shared";

export const PlacesTable = async () => {
  const places = await db.place.findMany();

  return (
    <div className="flex justify-between flex-col gap-3 border rounded-md pt-3">
      <div className="flex justify-between items-center px-3">
        <h2 className="font-bold">Места проведений</h2>
        <CreatePlaceButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-3">Название</TableHead>
            <TableHead className="w-[5%] pr-3">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[10px] overflow-y-auto">
          {places.map((place) => (
            <PlaceRow
              place={place}
              key={place.id}
              deleteButton={<DeletePlaceButton placeId={place.id} />}
              editButton={<EditPlaceButton place={place} />}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
