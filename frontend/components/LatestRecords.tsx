"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { DayRecordData } from "../app/actions";
import DayRecords from "./DayRecords";

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

type ItemsProps = { page: DayRecordData[] };

export default function LatestRecords({ page }: ItemsProps) {
  return (
    <Box>
      <Typography variant={"h5"} sx={{ my: 2 }}>
        最近三天的记录
      </Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {page.map((row) => (
          <DayRecords key={row.date} {...row} />
        ))}
      </Stack>
    </Box>
  );
}
