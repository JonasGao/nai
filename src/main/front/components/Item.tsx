import { Box, Typography } from "@mui/material";
import { LocalCafe } from "@mui/icons-material";
import React, { useMemo } from "react";
import { Operation } from "./FormFields";

export type FeedingRecord = {
  id: number;
  date: string;
  time: string;
  operation: Operation;
  value1: number;
  value2: number;
};

type ItemProps = {
  data: FeedingRecord;
};

function formatDatetime({ date, time }: FeedingRecord) {
  return new Date(`${date}T${time}.000Z`).toLocaleString();
}

export default function Item({ data }: ItemProps) {
  const datetime = useMemo(() => formatDatetime(data), [data]);
  return (
    <Box sx={{ display: "flex", alignContent: "center" }}>
      <Typography variant={"body1"} display={"inline"}>
        {datetime}
      </Typography>
      <LocalCafe />
      <Typography variant={"body1"} display={"inline"}>
        {data.operation}
      </Typography>
      <Typography variant={"body1"} display={"inline"}>
        {data.value1}
      </Typography>
      <Typography variant={"body1"} display={"inline"}>
        {data.value2}
      </Typography>
    </Box>
  );
}
