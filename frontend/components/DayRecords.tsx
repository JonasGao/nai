import type { DayRecordData } from "../app/actions";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Paper, Typography } from "@mui/material";
import Item from "./Item";
import Summary from "./Summary";

export default function DayRecords({ date, records, summary }: DayRecordData) {
  if (!summary) {
    console.log("is null", date);
  }
  const router = useRouter();
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant={"h6"}>{date}</Typography>
      <Summary data={summary} />
      {records.map((row) => (
        <Item key={row.id} data={row} onChange={refresh} onDelete={refresh} />
      ))}
    </Paper>
  );
}
