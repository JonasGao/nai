import React from "react";
import {TextField} from "@mui/material";

export default function BreastMilkFields() {
  return (
    <React.Fragment>
      <TextField id="value1" type="number" label="左侧 (分钟)" variant="standard"/>
      <TextField id="value2" type="number" label="右侧 (分钟)" variant="standard"/>
    </React.Fragment>
  )
}
