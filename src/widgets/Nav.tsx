import Link from "next/link";
import React from "react";

const pages: { title: string; href: string }[] = [
  { title: "Мероприятия", href: "/events" },
  { title: "Подборки", href: "/" },
  { title: "Акции", href: "/" },
  { title: "Поиск", href: "" },
];

export const Nav = () => {
  return (
    <nav className="flex gap-3 flex-col md:justify-between md:w-[30%] md:flex-row">
      {pages.map((page, i) => (
        <Link href={page.href} key={i} className="hover:underline">
          {page.title}
        </Link>
      ))}
    </nav>
  );
};
