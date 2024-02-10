import React, {useMemo} from "react";
import {TextField} from "@mui/material";

type MilkPowderFieldsProps = {
  value1: number,
  onChange: (value1: number) => void
}
export default function MilkPowderFields(props: MilkPowderFieldsProps) {
  const handleChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(parseInt(e.target.value))
  }, [props.onChange])
  return (
    <TextField id="value1" type="number" label="奶粉 (ml)" variant="standard" value={props.value1}
               onChange={handleChange}/>
  )
}
