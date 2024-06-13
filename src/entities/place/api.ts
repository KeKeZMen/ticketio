import { Place } from "@prisma/client";
import { Fetcher } from "swr";

export const placeFetcher: Fetcher<Array<Place>, string> = (url) =>
  fetch(url).then((res) => res.json());
