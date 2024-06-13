import { EventsTable } from "@widgets/EventsTable";
import { PlacesTable } from "@widgets/PlacesTable";
import React from "react";

export default function Admin() {
  return (
    <main>
      <div className="md:container">
        <div className="flex flex-col gap-5">
          <EventsTable />
          <PlacesTable />
        </div>
      </div>
    </main>
  );
}
