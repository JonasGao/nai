"use server";

import { FeedingRecord } from "../components/Item";
import { Operation } from "../components/FormFields";
import { BACKEND } from "../util/Constants";

export type DayRecordData = {
  date: string;
  records: FeedingRecord[];
  summary: Summary[];
};

export async function fetchDaysRecords(
  start?: string,
): Promise<DayRecordData[]> {
  const url = new URL(`${BACKEND}/api/days-feeding-records`);
  if (start) {
    url.searchParams.append("start", start);
  }
  const res = await fetch(url.toString(), {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: DayRecordData[] = await res.json();
  return data;
}

export type Summary = {
  date: string;
  operation: Operation;
  value1: number;
  value2: number;
  count: number;
};
