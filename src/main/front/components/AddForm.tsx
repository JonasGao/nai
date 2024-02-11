"use client";

import {Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import React, {useMemo, useState} from "react";
import FormFields, {Operation} from "./FormFields";
import dayjs from "dayjs";

export default function AddForm() {
  const [operation, setOperation] = useState<Operation>(`BREAST_MILK`)
  const [datetime, setDatetime] = useState(new Date())
  const datetimeValue = useMemo(() =>
    dayjs(datetime).format("YYYY-MM-DDTHH:mm:ss"), [datetime])
  const handleDatetimeChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime(dayjs(e.target.value).toDate())
  }, [setDatetime])
  const handleOperationChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setOperation(value as Operation)
  }, [setOperation])
  const [[value1, value2], setValues] = useState<[number, number | null]>([0, null])
  const handleValuesChange = useMemo(() => (value1: number, value2: number | null) => {
    setValues([value1, value2])
  }, [setValues])
  return (
    <React.Fragment>
      <FormControl>
        <RadioGroup
          value={operation}
          onChange={handleOperationChange}
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
        <TextField id="time" type="datetime-local" label="Time" variant="standard" value={datetimeValue}
                   onChange={handleDatetimeChange}/>
        <FormFields operation={operation} value1={value1} value2={value2} onChange={handleValuesChange}/>
      </Box>
    </React.Fragment>
  )
}
