"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { LocalCafe, Delete } from "@mui/icons-material";
import React, { useMemo } from "react";
import { Operation } from "./FormFields";
import { AlertErrorDetail } from "./AlertDialog";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import dayjs from "dayjs";
import { format } from "../util/Utils";

export type FeedingRecord = {
  id: number;
  date: string;
  time: string;
  operation: Operation;
  value1: number;
  value2: number;
};

type ItemProps = {
  data: FeedingRecord;
};

function formatDatetime({ date, time }: FeedingRecord) {
  return dayjs(`${date}T${time}.000Z`).format("YYYY-MM-DD HH:mm:ss");
}

async function remove(id: number, router: AppRouterInstance) {
  const resp = await fetch("/api/feeding-record/" + id, { method: "DELETE" });
  if (resp.ok) {
    router.refresh();
    return;
  }
  document.dispatchEvent(
    new CustomEvent<AlertErrorDetail>("alert-error", {
      detail: { message: "提交失败了！" },
    }),
  );
}

export default function Item({ data }: ItemProps) {
  const router = useRouter();
  const datetime = useMemo(() => formatDatetime(data), [data]);
  const id = data.id;
  const handleDelete = useMemo(
    () => () => {
      if (confirm("确定要删除么？")) {
        remove(id, router);
      }
    },
    [id, router],
  );
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Typography variant={"body1"} display={"inline"}>
          {datetime}
        </Typography>
        <LocalCafe />
        <Typography variant={"body1"} display={"inline"} sx={{ width: 80 }}>
          {format(data.operation)}
        </Typography>
        <Typography variant={"body1"} display={"inline"} sx={{ width: 50 }}>
          {data.value1}
        </Typography>
        <Typography variant={"body1"} display={"inline"} sx={{ width: 50 }}>
          {data.value2}
        </Typography>
      </Box>
      <IconButton color={"error"} onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Box>
  );
}
