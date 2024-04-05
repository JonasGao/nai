import { Box, Typography } from "@mui/material";
import React from "react";
import { format } from "../util/Utils";
import { type Summary } from "../app/actions";

type SummaryProps = { data: Summary[] };

export default function Summary({ data }: SummaryProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", my: 1 }}>
      {data.map((item) => (
        <Typography key={item.operation} variant={"subtitle1"} sx={{ mr: 2 }}>
          {format(item.operation)}：{item.count} 次，{item.value1}
          {item.value2 && "，" + item.value2}
        </Typography>
      ))}
    </Box>
  );
}
