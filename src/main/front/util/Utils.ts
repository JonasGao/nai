import { Operation } from "../components/FormFields";

const map = {
  BREAST_MILK: "母乳",
  BOTTLE_FEEDING: "母乳瓶喂",
  MILK_POWDER: "奶粉",
  BIG_ONE: "大号",
  LITTLE_ONE: "小号",
};

export function format(v: Operation) {
  return map[v];
}
