import React, { useMemo } from "react";
import { TextField } from "@mui/material";

type MilkPowderFieldsProps = {
  value1: number;
  onChange: (value1: number) => void;
};
export default function MilkPowderFields({
  value1,
  onChange,
}: MilkPowderFieldsProps) {
  const handleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value));
    },
    [onChange],
  );
  return (
    <TextField
      id="value1"
      type="number"
      label="奶粉 (ml)"
      variant="standard"
      value={value1}
      onChange={handleChange}
    />
  );
}
