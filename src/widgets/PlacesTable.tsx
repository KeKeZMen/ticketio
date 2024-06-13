import { PlaceRow } from "@entities/place/ui/PlaceRow";
import { CreatePlaceButton } from "@features/place/CreatePlaceButton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  db,
} from "@shared";
import React from "react";

export const PlacesTable = async () => {
  const places = await db.place.findMany();

  return (
    <div className="flex justify-between flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2>Места проведений</h2>
        <CreatePlaceButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.map((place) => (
            <PlaceRow place={place} key={place.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
