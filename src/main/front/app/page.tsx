import React from "react";
import { Box, Container, CssBaseline, Stack, Typography } from "@mui/material";
import Item, { FeedingRecord } from "../components/Item";
import AddForm from "../components/AddForm";
import AlertDialog from "../components/AlertDialog";
import { formatDatetime } from "../util/Utils";

type RecordPage = {
  content: FeedingRecord[];
};
type GroupRecord = [string, FeedingRecord[]][];

async function getData(): Promise<GroupRecord> {
  const res = await fetch("http://127.0.0.1:8080/api/feeding-records?size=20", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: RecordPage = await res.json();
  const arr: GroupRecord = [];
  if (data.content.length) {
    let { date: latestDate } = formatDatetime(data.content[0]);
    let rows: FeedingRecord[] = [];
    let group: [string, FeedingRecord[]] = [latestDate, rows];
    arr.push(group);
    data.content.forEach((i) => {
      const { date } = formatDatetime(i);
      if (date !== latestDate) {
        latestDate = date;
        rows = [];
        group = [latestDate, rows];
        arr.push(group);
      }
      rows.push(i);
    });
  }
  return arr;
}

export default async function Home() {
  const data = await getData();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box>
          <AddForm />
        </Box>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {data.map(([date, rows]) => (
            <Box key={date}>
              <Typography variant={"subtitle1"}>{date}</Typography>
              {rows.map((item) => (
                <Item key={item.id} data={item} />
              ))}
            </Box>
          ))}
        </Stack>
        <AlertDialog />
      </Container>
    </React.Fragment>
  );
}
