import React from "react";
import {TextField} from "@mui/material";

export default function BottleFeedingFields() {
  return (
    <React.Fragment>
      <TextField id="value1" type="number" label="瓶喂 (ml)" variant="standard"/>
    </React.Fragment>
  )
}
