"use server";

import { GroupRecord } from "../components/Items";
import { FeedingRecord } from "../components/Item";
import { formatDatetime } from "../util/Utils";

type RecordPage = {
  content: FeedingRecord[];
};

export async function fetchPageGroup(page: number = 0): Promise<GroupRecord> {
  const res = await fetch(
    "http://127.0.0.1:8080/api/feeding-records?size=20&page=" + page,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: RecordPage = await res.json();
  const arr: GroupRecord = [];
  if (data.content.length) {
    let { date: latestDate } = formatDatetime(data.content[0]);
    let rows: FeedingRecord[] = [];
    let group: [string, FeedingRecord[]] = [latestDate, rows];
    arr.push(group);
    data.content.forEach((i) => {
      const { date } = formatDatetime(i);
      if (date !== latestDate) {
        latestDate = date;
        rows = [];
        group = [latestDate, rows];
        arr.push(group);
      }
      rows.push(i);
    });
  }
  return arr;
}
