import React, {useMemo} from "react";
import {TextField} from "@mui/material";

type BottleFeedingFieldsProps = {
  value1: number,
  onChange: (value1: number) => void
}
export default function BottleFeedingFields(props: BottleFeedingFieldsProps) {
  const handleChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(parseInt(e.target.value))
  }, [props.onChange])
  return (
    <TextField id="value1" type="number" label="瓶喂 (ml)" variant="standard" value={props.value1}
               onChange={handleChange}/>
  )
}
