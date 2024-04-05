import React, { useMemo } from "react";
import BreastMilkFields from "./BreastMilkFields";
import BottleFeedingFields from "./BottleFeedingFields";
import MilkPowderFields from "./MilkPowderFields";

export type Operation =
  | "BREAST_MILK"
  | "BOTTLE_FEEDING"
  | "MILK_POWDER"
  | "BIG_ONE"
  | "LITTLE_ONE";

export const operations: Operation[] = [
  "BREAST_MILK",
  "BOTTLE_FEEDING",
  "MILK_POWDER",
  "BIG_ONE",
  "LITTLE_ONE",
];

type FormFieldsProps = {
  operation: Operation;
  value1: number;
  value2: number | null;
  onChange: (value1: number, value2: number | null) => void;
};

export default function FormFields({
  operation,
  value2,
  value1,
  onChange,
}: FormFieldsProps) {
  const handleChange = useMemo(() => {
    switch (operation) {
      case "BREAST_MILK":
        return onChange;
      case "MILK_POWDER":
      case "BOTTLE_FEEDING":
        return (value1: number) => onChange(value1, null);
      default:
        return null;
    }
  }, [onChange, operation]);
  switch (operation) {
    case "BREAST_MILK":
      return (
        <BreastMilkFields
          value1={value1}
          value2={value2}
          onChange={handleChange!!}
        />
      );
    case "BOTTLE_FEEDING":
      return (
        //@ts-ignore
        <BottleFeedingFields value1={value1} onChange={handleChange} />
      );
    case "MILK_POWDER":
      //@ts-ignore
      return <MilkPowderFields value1={value1} onChange={handleChange} />;
  }
}
