import {Box, Typography} from "@mui/material";
import {LocalCafe} from "@mui/icons-material";
import React from "react";
import {Operation} from "./FormFields";

export type FeedingRecord = {
  id: number,
  date: string, time: string, operation: Operation, value1: number, value2: number
}

type ItemProps = {
  data: FeedingRecord
}

export default function Item(props: ItemProps) {
  const {data} = props;
  return (
    <Box sx={{display: "flex", alignContent: "center"}}>
      <Typography variant={"body1"} display={"inline"}>
        {data.date} {data.time}
      </Typography>
      <LocalCafe/>
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
  )
}
