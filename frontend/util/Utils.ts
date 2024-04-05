import { Operation } from "../components/FormFields";
import dayjs from "dayjs";
import { FeedingRecord } from "../components/Item";

const map = {
  BREAST_MILK: "母乳",
  BOTTLE_FEEDING: "母乳瓶喂",
  MILK_POWDER: "奶粉",
  BIG_ONE: "臭臭",
  LITTLE_ONE: "嘘嘘",
};

export function format(v: Operation) {
  return map[v];
}

export function formatDatetime({ date, time }: FeedingRecord) {
  const d = dayjs(`${date}T${time}.000Z`);
  return {
    date: d.format("YYYY-MM-DD"),
    time: d.format("HH:mm:ss"),
    stime: d.format("HH:mm"),
  };
}

export function recordDatetime({ date, time }: FeedingRecord) {
  return dayjs(`${date}T${time}.000Z`);
}

export function descSortRecord(a: FeedingRecord, b: FeedingRecord) {
  return recordDatetime(a).isAfter(recordDatetime(b)) ? -1 : 1;
}
