import React, { useMemo } from "react";
import { TextField } from "@mui/material";

type BottleFeedingFieldsProps = {
  value1: number;
  onChange: (value1: number) => void;
};
export default function BottleFeedingFields({
  value1,
  onChange,
}: BottleFeedingFieldsProps) {
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
      label="瓶喂 (ml)"
      variant="standard"
      value={value1}
      onChange={handleChange}
    />
  );
}
