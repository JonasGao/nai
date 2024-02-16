"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Item, { FeedingRecord } from "./Item";
import { fetchPageGroup } from "../app/actions";

function LoadMore({ onLoad }: { onLoad: () => void }) {
  return (
    <Button
      variant={"outlined"}
      sx={{ width: "100%", mb: 4, mt: 2 }}
      onClick={onLoad}
    >
      加载更多...
    </Button>
  );
}

export type GroupRecord = [string, FeedingRecord[]][];

function merge(data: GroupRecord, more: GroupRecord): GroupRecord {
  more.forEach(([date, rows]) => {
    const index = data.findIndex(([d]) => d === date);
    if (index === -1) {
      data.push([date, rows]);
    } else {
      data[index][1].push(...rows);
    }
  });
  return [...data];
}

export default function Items({ page }: { page: GroupRecord }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState(page);
  let loading = false;
  const handleLoadMore = async () => {
    if (loading) {
      return;
    }
    loading = true;
    const p = pageNumber + 1;
    const more = await fetchPageGroup(p);
    loading = false;
    setData(merge(data, more));
    setPageNumber(p);
  };
  return (
    <Box>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {data.map(([date, rows]) => (
          <Box key={date}>
            <Typography variant={"subtitle1"}>{date}</Typography>
            {rows.map((item) => (
              <Item
                key={item.id}
                data={item}
                onChange={(changed) => {
                  setData(
                    data.map(([d, r]) => [
                      d,
                      r.map((i) => (i.id === item.id ? changed : i)),
                    ]),
                  );
                }}
                onDelete={() => {
                  setData(
                    data.map(([d, r]) => [
                      d,
                      r.filter((i) => i.id !== item.id),
                    ]),
                  );
                }}
              />
            ))}
          </Box>
        ))}
      </Stack>
      <LoadMore onLoad={handleLoadMore} />
    </Box>
  );
}
