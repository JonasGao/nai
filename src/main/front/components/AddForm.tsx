"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import FormFields, { Operation } from "./FormFields";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { AlertErrorDetail } from "./AlertDialog";

type AddFeedingRecord = {
  time: string;
  operation: Operation;
  value1: number;
  value2: number | null;
};

export default function AddForm() {
  const router = useRouter();
  const [operation, setOperation] = useState<Operation>(`BREAST_MILK`);
  const now = dayjs();
  const [date, setDate] = useState(now.format("YYYY-MM-DD"));
  const [time, setTime] = useState(now.format("HH:mm:ss"));
  const [datetimeChanged, setDatetimeChanged] = useState(false);
  const handleDateChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
      setDatetimeChanged(true);
    },
    [],
  );
  const handleTimeChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      setTime(e.target.value);
      setDatetimeChanged(true);
    },
    [],
  );
  const handleOperationChange = useMemo(
    () => (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setOperation(value as Operation);
      if (!datetimeChanged) {
        // 如果没有人工修改过，则自动更新时间
        const now = dayjs();
        setDate(now.format("YYYY-MM-DD"));
        setTime(now.format("HH:mm:ss"));
      }
    },
    [datetimeChanged],
  );
  const [[value1, value2], setValues] = useState<[number, number | null]>([
    0,
    null,
  ]);
  const handleValuesChange = useMemo(
    () => (value1: number, value2: number | null) => {
      setValues([value1, value2]);
    },
    [],
  );
  const handleSubmit = useMemo(
    () => () => {
      fetch("/api/feeding-record", {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          operation: operation,
          value1: value1,
          value2: value2,
          time: new Date(`${date}T${time}.000+08:00`).toISOString(),
        }),
      }).then((resp) => {
        if (resp.ok) {
          // 完全重置页面的状态
          setValues([0, null]);
          const now = dayjs();
          setDate(now.format("YYYY-MM-DD"));
          setTime(now.format("HH:mm:ss"));
          setDatetimeChanged(false);
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
    [operation, value1, value2, date, time, router],
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
        <TextField
          id="date"
          type="date"
          label="日期"
          variant="standard"
          value={date}
          onChange={handleDateChange}
        />
        <TextField
          id="time"
          type="time"
          label="时间"
          variant="standard"
          value={time}
          onChange={handleTimeChange}
        />
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
