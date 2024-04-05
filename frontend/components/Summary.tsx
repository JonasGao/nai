import { Box, Typography } from "@mui/material";
import React from "react";
import { format } from "../util/Utils";
import { type Summary } from "../app/actions";

type SummaryProps = { data: Summary[] };

function count(item: Summary) {
  return item.count + "次";
}

function value1(item: Summary) {
  switch (item.operation) {
    case "BREAST_MILK":
    case "BOTTLE_FEEDING":
    case "MILK_POWDER":
      if (item.value1) {
        return `，${item.value1}ml`;
      }
      break;
  }
  return null;
}

function value2(item: Summary) {
  switch (item.operation) {
    case "BREAST_MILK":
      if (item.value2) {
        return `，${item.value2}ml`;
      }
      break;
    default:
  }
  return null;
}

export default function Summary({ data }: SummaryProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", my: 1 }}>
      {data.map((item) => (
        <Typography key={item.operation} variant={"subtitle1"} sx={{ mr: 2 }}>
          {format(item.operation)}：{count(item)}
          {value1(item)}
          {value2(item)}
        </Typography>
      ))}
    </Box>
  );
}
