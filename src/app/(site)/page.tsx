import { db } from "@shared";
import { Banner } from "@widgets/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticket.io | Главная",
};

export default async function Home() {
  const bannerEvents = await db.event.findMany({
    take: 3,
  });

  return (
    <main>
      <Banner events={bannerEvents} />
    </main>
  );
}
