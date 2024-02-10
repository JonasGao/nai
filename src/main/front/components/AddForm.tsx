import {Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import React, {useMemo, useState} from "react";
import FormFields from "./FormFields";
import dayjs from "dayjs";

export default function AddForm() {
  const [operation,setOperation] = useState(`BREAST_MILK`)
  const [datetime, setDatetime] = useState(new Date())
  const datetimeValue = useMemo(() =>
    dayjs(datetime).format("YYYY-MM-DDTHH:mm:ss"), [])
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
        <TextField id="time" type="datetime-local" label="Time" variant="standard" value={datetimeValue}/>
        <FormFields operation={operation}/>
      </Box>
    </React.Fragment>
  )
}
