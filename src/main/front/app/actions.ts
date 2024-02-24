"use server";

import { FeedingRecord } from "../components/Item";
import { Operation } from "../components/FormFields";

export type DayRecord = {
  date: string;
  records: FeedingRecord[];
  summary: Summary[];
};

export async function fetchDaysRecords(page: number = 0): Promise<DayRecord[]> {
  const res = await fetch("http://127.0.0.1:8080/api/days-feeding-records", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: DayRecord[] = await res.json();
  return data;
}

export type Summary = {
  date: string;
  operation: Operation;
  value1: number;
  value2: number;
  count: number;
};
