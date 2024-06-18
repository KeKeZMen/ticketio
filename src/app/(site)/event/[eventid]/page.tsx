import { db } from "@shared";
import React from "react";

export default async function page({
  params,
}: {
  params: { eventid: string };
}) {
  const event = await db.event.findFirst({
    where: {
      id: params.eventid,
    },
  });

  return <div>page</div>;
}
