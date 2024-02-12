"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import FormFields, { Operation } from "./FormFields";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { AlertErrorDetail } from "./AlertDialog";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type AddFeedingRecord = {
  time: string;
  operation: Operation;
  value1: number;
  value2: number | null;
};

export default function AddForm() {
  const router = useRouter();
  const [operation, setOperation] = useState<Operation>(`BREAST_MILK`);
  const [datetime, setDatetime] = useState<Dayjs | null>(null);
  const handleDatetimeChange = useMemo(
    () => (value: Dayjs | null) => {
      setDatetime(value);
    },
    [setDatetime],
  );
  const handleOperationChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setOperation(value as Operation);
    },
    [setOperation],
  );
  const [[value1, value2], setValues] = useState<[number, number | null]>([
    0,
    null,
  ]);
  const handleValuesChange = useMemo(
    () => (value1: number, value2: number | null) => {
      setValues([value1, value2]);
    },
    [setValues],
  );
  const handleSubmit = useMemo(
    () => () => {
      const time = (datetime || dayjs()).toISOString();
      fetch("/api/feeding-record", {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          operation: operation,
          value1: value1,
          value2: value2,
          time: time,
        }),
      }).then((resp) => {
        if (resp.ok) {
          setValues([0, null]);
          setDatetime(null);
          router.refresh();
        } else {
          document.dispatchEvent(
            new CustomEvent<AlertErrorDetail>("alert-error", {
              detail: { message: "提交失败了！" },
            }),
          );
        }
      });
    },
    [operation, value1, value2, datetime],
  );
  return (
    <Box>
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
            label="母乳"
          />
          <FormControlLabel
            value="BOTTLE_FEEDING"
            control={<Radio />}
            label="瓶喂"
          />
          <FormControlLabel
            value="MILK_POWDER"
            control={<Radio />}
            label="奶粉"
          />
          <FormControlLabel value="BIG_ONE" control={<Radio />} label="大号" />
          <FormControlLabel
            value="LITTLE_ONE"
            control={<Radio />}
            label="小号"
          />
        </RadioGroup>
      </FormControl>
      <Box component={"form"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="时间"
            value={datetime}
            onChange={handleDatetimeChange}
          />
        </LocalizationProvider>
        <FormFields
          operation={operation}
          value1={value1}
          value2={value2}
          onChange={handleValuesChange}
        />
      </Box>
      <Button onClick={handleSubmit}>提交</Button>
    </Box>
  );
}
