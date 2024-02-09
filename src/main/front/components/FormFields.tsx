import {TextField} from "@mui/material";
import React from "react";

type FormFieldsProps = {
  operation: string
}

export default function FormFields(props:FormFieldsProps) {
  return (
    <React.Fragment>
      <TextField id="time" type="datetime-local" label="Time" variant="standard"/>
      <TextField id="value1" type="number" label="Value1" variant="standard"/>
      <TextField id="value2" type="number" label="Value2" variant="standard"/>
    </React.Fragment>
  )
}
