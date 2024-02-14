"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useMemo } from "react";
import { Operation } from "./FormFields";
import { AlertErrorDetail } from "./AlertDialog";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { format, formatDatetime } from "../util/Utils";
import OperationIcon from "./OperationIcon";

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
  const { time } = useMemo(() => formatDatetime(data), [data]);
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
        <Typography variant={"body1"} display={"inline"} sx={{ width: 90 }}>
          {time}
        </Typography>
        <Typography variant={"body1"} display={"inline"} sx={{ width: 40 }}>
          <OperationIcon value={data.operation} />
        </Typography>
        <Typography variant={"body1"} display={"inline"} sx={{ width: 90 }}>
          {format(data.operation)}
        </Typography>
        <Typography variant={"body1"} display={"inline"} sx={{ width: 40 }}>
          {data.value1}
        </Typography>
        <Typography variant={"body1"} display={"inline"} sx={{ width: 40 }}>
          {data.value2}
        </Typography>
      </Box>
      <IconButton color={"error"} onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Box>
  );
}
