import { Place } from "@prisma/client";
import { TableCell, TableRow } from "@shared";
import React, { FC } from "react";

type PropsType = {
  place: Place;
  editButton?: JSX.Element;
  deleteButton?: JSX.Element;
};

export const PlaceRow: FC<PropsType> = ({
  place,
  deleteButton,
  editButton,
}) => {
  return (
    <TableRow>
      <TableCell>{place.name}</TableCell>
      <TableCell>
        <div className="flex gap-3 items-center justify-center">
          {editButton}
          {deleteButton}
        </div>
      </TableCell>
    </TableRow>
  );
};
