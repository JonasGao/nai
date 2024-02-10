import {FormControlLabel, Radio, TextField} from "@mui/material";
import React from "react";

export type Operation = "BREAST_MILK" | "BOTTLE_FEEDING" | "MILK_POWDER" | "BIG_ONE" | "LITTLE_ONE"

type FormFieldsProps = {
  operation: Operation
}

export default function FormFields(props: FormFieldsProps) {
  return (
    <React.Fragment>
      <TextField id="value1" type="number" label="Value1" variant="standard"/>
      <TextField id="value2" type="number" label="Value2" variant="standard"/>
    </React.Fragment>
  )
}
