import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchSummary, Summary } from "../app/actions";
import { format } from "../util/Utils";

type SummaryProps = { date: string };

export default function Summary({ date }: SummaryProps) {
  const [data, setData] = useState<Summary[]>([]);
  useEffect(() => {
    fetchSummary(date).then((data) => {
      setData(data);
    });
  }, [date]);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {data.map((item) => (
        <Typography key={item.operation} variant={"subtitle2"} sx={{ mr: 2 }}>
          {format(item.operation)}：{item.count} 次，{item.value1}
          {item.value2 && "，" + item.value2}
        </Typography>
      ))}
    </Box>
  );
}
