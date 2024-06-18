import { db } from "@shared";
import { Banner } from "@widgets/Banner";
import { Selections } from "@widgets/Selections";
import { UpcomingEvents } from "@widgets/UpcomingEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticket.io | Главная",
};

export default async function Home() {
  const latestEvents = await db.event.findMany({
    take: 3,
    orderBy: {
      id: "desc",
    },
  });

  const upcomingEvents = await db.event.findMany({
    where: {
      startTime: {
        lt: new Date(new Date().setDate(new Date().getDate() + 5)), // events starting < 3 days
      },
    },
    include: {
      place: {
        select: {
          name: true,
        },
      },
    },
  });

  const selections: {
    id: string;
    title: string;
    createdAt: Date;
  }[] = [
    {
      id: "5c90eeb0-3a6b-4c73-a8e4-5ba494cf9b55",
      title: "Ночь в музее 2024: главные события в Москве",
      createdAt: new Date(),
    },
    {
      id: "7a521256-b76c-4f9e-9c8b-077af0909a26",
      title: "Гастроли проекта «Сначала театр – театр с начала»",
      createdAt: new Date(),
    },
    {
      id: "a12415c0-0655-4d4d-85da-e7a2b8ec3c68",
      title: "Выставки мая в Москве: Церетели, Васнецовы и советская мода",
      createdAt: new Date(),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10">
        <Banner events={latestEvents} />

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl">События в ближайшие дни</h2>
          <UpcomingEvents events={upcomingEvents} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl">Подборки</h2>
          <Selections selections={selections} />
        </div>
      </div>
    </>
  );
}
