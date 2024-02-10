import {FormControlLabel, Radio, TextField} from "@mui/material";
import React from "react";
import BreastMilkFields from "./BreastMilkFields";
import BottleFeedingFields from "./BottleFeedingFields";
import MilkPowderFields from "./MilkPowderFields";

export type Operation = "BREAST_MILK" | "BOTTLE_FEEDING" | "MILK_POWDER" | "BIG_ONE" | "LITTLE_ONE"

type FormFieldsProps = {
  operation: Operation
}

export default function FormFields(props: FormFieldsProps) {
  switch (props.operation) {
    case "BREAST_MILK": return <BreastMilkFields/>
    case "BOTTLE_FEEDING": return <BottleFeedingFields/>
    case "MILK_POWDER": return <MilkPowderFields/>
  }
}
