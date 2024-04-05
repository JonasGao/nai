"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import FormFields, { Operation } from "./FormFields";
import dayjs from "dayjs";
import { format } from "../util/Utils";
import { alertError } from "../util/Events";
import { useRouter } from "next/navigation";

export default function AddForm() {
  const [operation, setOperation] = useState<Operation>(`BREAST_MILK`);
  const now = dayjs();
  const [date, setDate] = useState(now.format("YYYY-MM-DD"));
  const [time, setTime] = useState(now.format("HH:mm:ss"));
  const [datetimeChanged, setDatetimeChanged] = useState(false);
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
      setDatetimeChanged(true);
    },
    [],
  );
  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTime(e.target.value);
      setDatetimeChanged(true);
    },
    [],
  );
  const handleOperationChange = useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
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
  const handleValuesChange = useCallback(
    (value1: number, value2: number | null) => {
      setValues([value1, value2]);
    },
    [],
  );
  const router = useRouter();
  const handleSubmit = useCallback(async () => {
    const resp = await fetch("/api/feeding-record", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        operation: operation,
        value1: value1,
        value2: value2,
        date: date,
        time: time,
      }),
    });
    if (resp.ok) {
      // 完全重置页面的状态
      setValues([0, null]);
      const now = dayjs();
      setDate(now.format("YYYY-MM-DD"));
      setTime(now.format("HH:mm:ss"));
      setDatetimeChanged(false);
      router.refresh();
    } else {
      alertError("提交失败了！");
    }
  }, [operation, value1, value2, date, time, router]);
  return (
    <Box>
      <Typography variant={"h5"} sx={{ my: 2 }}>
        添加记录
      </Typography>
      <Paper sx={{ p: 2 }}>
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
        <Box
          component={"form"}
          sx={{
            mx: -1,
            "& > :not(style)": { m: 1 },
          }}
        >
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
        <Button
          onClick={handleSubmit}
          sx={{ width: "100%" }}
          variant={"contained"}
        >
          提交
        </Button>
      </Paper>
    </Box>
  );
}
