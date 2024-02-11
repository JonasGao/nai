import React, {useMemo} from "react";
import {TextField} from "@mui/material";

type BreastMilkFieldsProps = {
  value1: number,
  value2: number | null,
  onChange: (value1: number, value2: number | null) => void
}
export default function BreastMilkFields(props: BreastMilkFieldsProps) {
  const handleChange1 = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(parseInt(e.target.value), props.value2)
  }, [props.onChange, props.value2])
  const handleChange2 = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(props.value1, e.target.value === "" ? null : parseInt(e.target.value))
  }, [props.onChange, props.value1])
  const notNullValue2 = useMemo(() => props.value2 || "", [props.value2])
  return (
    <React.Fragment>
      <TextField id="value1" type="number" label="左侧 (分钟)" variant="standard" value={props.value1}
                 onChange={handleChange1}/>
      <TextField id="value2" type="number" label="右侧 (分钟)" variant="standard" value={notNullValue2}
                 onChange={handleChange2}/>
    </React.Fragment>
  )
}
