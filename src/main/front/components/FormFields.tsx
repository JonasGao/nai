import {FormControlLabel, Radio, TextField} from "@mui/material";
import React, {useMemo} from "react";
import BreastMilkFields from "./BreastMilkFields";
import BottleFeedingFields from "./BottleFeedingFields";
import MilkPowderFields from "./MilkPowderFields";

export type Operation = "BREAST_MILK" | "BOTTLE_FEEDING" | "MILK_POWDER" | "BIG_ONE" | "LITTLE_ONE"

type FormFieldsProps = {
  operation: Operation,
  value1: number,
  value2: number | null,
  onChange: (value1: number, value2: number | null) => void
}

export default function FormFields(props: FormFieldsProps) {
  const handleChange = useMemo(() => {
    switch (props.operation) {
      case "BREAST_MILK":
        return props.onChange
      case "MILK_POWDER":
      case "BOTTLE_FEEDING":
        return (value1: number) => props.onChange(value1, null)
      default:
        return null;
    }
  }, [props.operation, props.onChange])
  switch (props.operation) {
    case "BREAST_MILK":
      //@ts-ignore
      return <BreastMilkFields value1={props.value1} value2={props.value2} onChange={handleChange}/>
    case "BOTTLE_FEEDING":
      //@ts-ignore
      return <BottleFeedingFields value1={props.value1} onChange={handleChange}/>
    case "MILK_POWDER":
      //@ts-ignore
      return <MilkPowderFields value1={props.value1} onChange={handleChange}/>
  }
}
