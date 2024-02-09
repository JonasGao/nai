import {Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import React, {useState} from "react";
import FormFields from "./FormFields";

export default function AddForm() {
  const [operation,setOperation] = useState(`BREAST_MILK`)
  return (
    <React.Fragment>
      <FormControl>
        <RadioGroup
          defaultValue={operation}
          row
          name="operations"
        >
          <FormControlLabel value="BREAST_MILK" control={<Radio/>} label="母乳"/>
          <FormControlLabel value="BOTTLE_FEEDING" control={<Radio/>} label="瓶喂"/>
          <FormControlLabel value="MILK_POWDER" control={<Radio/>} label="奶粉"/>
          <FormControlLabel value="BIG_ONE" control={<Radio/>} label="大号"/>
          <FormControlLabel value="LITTLE_ONE" control={<Radio/>} label="小号"/>
        </RadioGroup>
      </FormControl>
      <Box component={"form"}>
        <FormFields operation={operation}/>
      </Box>
    </React.Fragment>
  )
}
