"use client";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import Item from "./Item";
import { type DayRecord } from "../app/actions";
import Summary from "./Summary";
import { useRouter } from "next/navigation";

function LoadMore({
  onLoad,
  disabled,
}: {
  onLoad: () => void;
  disabled: boolean;
}) {
  return (
    <Button
      variant={"outlined"}
      sx={{ width: "100%", mb: 4, mt: 2 }}
      disabled={disabled}
      onClick={onLoad}
    >
      加载更多...
    </Button>
  );
}

function DayRecordPaper({ date, records, summary }: DayRecord) {
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
      <hr />
      {records.map((row) => (
        <Item key={row.id} data={row} onChange={refresh} onDelete={refresh} />
      ))}
    </Paper>
  );
}

type ItemsProps = { page: DayRecord[] };

export default function Items({ page }: ItemsProps) {
  return (
    <Box>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {page.map((row) => (
          <DayRecordPaper key={row.date} {...row} />
        ))}
      </Stack>
    </Box>
  );
}
