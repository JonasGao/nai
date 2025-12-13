"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  nickname: string | null;
  childName: string | null;
  userType: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.status === 401 || response.status === 403) {
        // Not authenticated or not admin
        router.push("/login");
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError("获取用户列表失败");
      }
    } catch (err) {
      setError("获取用户列表失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除该用户吗？")) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the list
        fetchUsers();
      } else {
        setError("删除用户失败");
      }
    } catch (err) {
      setError("删除用户失败");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>加载中...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" component="h1">
            用户管理
          </Typography>
          <Button variant="outlined" onClick={handleBack}>
            返回主页
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>用户名</TableCell>
                <TableCell>昵称</TableCell>
                <TableCell>宝宝名字</TableCell>
                <TableCell>用户类型</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.nickname || "-"}</TableCell>
                  <TableCell>{user.childName || "-"}</TableCell>
                  <TableCell>
                    {user.userType === "ADMIN" ? "管理员" : "普通用户"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      disabled={user.userType === "ADMIN"}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
