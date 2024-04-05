"use client";

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { format } from "../util/Utils";
import React, { useCallback, useState } from "react";
import { Operation } from "./FormFields";
import dayjs from "dayjs";

export default function SelectAddForm() {
  const [operation, setOperation] = useState<Operation>(`BREAST_MILK`);
  const handleOperationChange = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setOperation(value as Operation);
    },
    [],
  );
  return (
    <Box>
      <Typography variant={"h5"} sx={{ my: 2 }}>
        添加记录
      </Typography>
      <FormControl>
        <RadioGroup
          value={operation}
          onChange={handleOperationChange}
          row
          name="operations"
        >
          <FormControlLabel
            value="BREAST_MILK"
            control={<Radio />}
            label={format("BREAST_MILK")}
          />
          <FormControlLabel
            value="BOTTLE_FEEDING"
            control={<Radio />}
            label={format("BOTTLE_FEEDING")}
          />
          <FormControlLabel
            value="MILK_POWDER"
            control={<Radio />}
            label={format("MILK_POWDER")}
          />
          <FormControlLabel
            value="BIG_ONE"
            control={<Radio />}
            label={format("BIG_ONE")}
          />
          <FormControlLabel
            value="LITTLE_ONE"
            control={<Radio />}
            label={format("LITTLE_ONE")}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
