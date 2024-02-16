"use client";

import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit, Cancel, Save } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import { Operation, operations } from "./FormFields";
import { AlertErrorDetail } from "./AlertDialog";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { format, formatDatetime } from "../util/Utils";
import OperationIcon from "./OperationIcon";
import dayjs from "dayjs";

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

type ItemFieldsProps = {
  data: FeedingRecord;
  onChange: (data: FeedingRecord) => void;
};

function ItemFields({ data, onChange }: ItemFieldsProps) {
  const handleChangeTime = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, time: e.target.value });
    },
    [data, onChange],
  );
  const handleChangeValue1 = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, value1: +e.target.value });
    },
    [data, onChange],
  );
  const handleChangeValue2 = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, value2: +e.target.value });
    },
    [data, onChange],
  );
  const handleChangeOperation = useMemo(
    () => (e: SelectChangeEvent) => {
      onChange({ ...data, operation: e.target.value as Operation });
    },
    [data, onChange],
  );
  const value2 = useMemo(() => data.value2 ?? "", [data]);
  return (
    <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
      <TextField
        id="time"
        type="time"
        label="时间"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={data.time}
        onChange={handleChangeTime}
      />
      <FormControl fullWidth>
        <InputLabel id="operation-label">咋啦</InputLabel>
        <Select
          labelId="operation-label"
          id="operation-select"
          value={data.operation}
          label={"咋啦"}
          onChange={handleChangeOperation}
        >
          {operations.map((key) => (
            <MenuItem key={key} value={key}>
              <OperationIcon value={key} /> {format(key)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="V1"
        variant="outlined"
        value={data.value1}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeValue1}
      />
      <TextField
        type="number"
        label="V2"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={value2}
        onChange={handleChangeValue2}
      />
    </Stack>
  );
}

type FieldsActionProps = {
  onCancel: () => void;
  onOk: () => void;
};

function FieldsAction({ onCancel, onOk }: FieldsActionProps) {
  return (
    <Box>
      <IconButton color={"warning"} onClick={onOk}>
        <Save />
      </IconButton>
      <IconButton color={"primary"} onClick={onCancel}>
        <Cancel />
      </IconButton>
    </Box>
  );
}

function ItemView({ data }: ItemProps) {
  const { time } = useMemo(() => formatDatetime(data), [data]);
  return (
    <React.Fragment>
      <Typography variant={"body1"} display={"inline"} sx={{ width: 80 }}>
        {time}
      </Typography>
      <Typography variant={"body1"} display={"inline"} sx={{ width: 30 }}>
        <OperationIcon value={data.operation} />
      </Typography>
      <Typography variant={"body1"} display={"inline"} sx={{ width: 80 }}>
        {format(data.operation)}
      </Typography>
      <Typography variant={"body1"} display={"inline"} sx={{ width: 40 }}>
        {data.value1}
      </Typography>
      <Typography variant={"body1"} display={"inline"} sx={{ width: 40 }}>
        {data.value2}
      </Typography>
    </React.Fragment>
  );
}

type ViewActionProps = {
  onEdit: () => void;
  onDelete: () => void;
};

function ViewAction({ onDelete, onEdit }: ViewActionProps) {
  return (
    <React.Fragment>
      <IconButton color={"primary"} onClick={onEdit}>
        <Edit />
      </IconButton>
      <IconButton color={"error"} onClick={onDelete}>
        <Delete />
      </IconButton>
    </React.Fragment>
  );
}

export default function Item({ data }: ItemProps) {
  const router = useRouter();
  const handleDelete = useMemo(
    () => () => {
      if (confirm("确定要删除么？")) {
        remove(data.id, router);
      }
    },
    [data, router],
  );
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<FeedingRecord | null>(null);
  const handleEdit = useMemo(
    () => () => {
      setEdit(true);
      setEditData({ ...data });
    },
    [data],
  );
  const handleCancel = useMemo(() => () => setEdit(false), []);
  const handleOk = useMemo(
    () => () => {
      fetch("/api/feeding-record", {
        method: "PUT",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(editData),
      }).then((resp) => {
        if (resp.ok) {
          router.refresh();
        } else {
          document.dispatchEvent(
            new CustomEvent<AlertErrorDetail>("alert-error", {
              detail: { message: "提交失败了！" },
            }),
          );
        }
      });
      setEdit(false);
    },
    [editData, router],
  );
  const handleChange = useMemo(
    () => (data: FeedingRecord) => setEditData(data),
    [],
  );
  if (edit) {
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <ItemFields data={editData!!} onChange={handleChange} />
        <FieldsAction onCancel={handleCancel} onOk={handleOk} />
      </Box>
    );
  }
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
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <ItemView data={data} />
      </Box>
      <ViewAction onDelete={handleDelete} onEdit={handleEdit} />
    </Box>
  );
}
