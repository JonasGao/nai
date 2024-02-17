"use client";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Item, { FeedingRecord } from "./Item";
import { fetchPageGroup } from "../app/actions";
import { useNewFeedingRecordEvent } from "../util/Events";
import { descSortRecord } from "../util/Utils";
import Summary from "./Summary";

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

function mergeRows(rows0: FeedingRecord[], rows1: FeedingRecord[]) {
  return rows1
    .reduce((acc, row) => {
      const index = acc.findIndex((r) => r.id === row.id);
      if (index === -1) {
        acc.push(row);
      } else {
        acc[index] = row;
      }
      return acc;
    }, rows0)
    .sort(descSortRecord);
}

function merge(data: GroupRecord, more: GroupRecord): GroupRecord {
  more.forEach(([date, rows]) => {
    const index = data.findIndex(([d]) => d === date);
    if (index === -1) {
      data.push([date, rows]);
    } else {
      data[index][1] = mergeRows(data[index][1], rows);
    }
  });
  return [...data];
}

function toItem(data: GroupRecord, setData: (data: GroupRecord) => void) {
  return function WrapItem(item: FeedingRecord) {
    return (
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
          setData(data.map(([d, r]) => [d, r.filter((i) => i.id !== item.id)]));
        }}
      />
    );
  };
}

function toDayRecord(data: GroupRecord, setData: (data: GroupRecord) => void) {
  return function DayRecord([date, rows]: [string, FeedingRecord[]]) {
    return (
      <Paper key={date} sx={{ p: 2 }}>
        <Typography variant={"h6"}>{date}</Typography>
        <Summary date={date} />
        <hr />
        {rows.map(toItem(data, setData))}
      </Paper>
    );
  };
}

type ItemsProps = { page: GroupRecord };

export default function Items({ page }: ItemsProps) {
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
  useNewFeedingRecordEvent(({ detail }) => {
    setData(merge(data, [[detail.data.date, [detail.data]]]));
  });
  return (
    <Box>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {data.map(toDayRecord(data, setData))}
      </Stack>
      <LoadMore onLoad={handleLoadMore} />
    </Box>
  );
}
