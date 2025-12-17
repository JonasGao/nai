"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    childName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
          nickname: formData.nickname,
          childName: formData.childName,
        }),
      });

      if (response.ok) {
        // Registration successful, redirect to login
        alert("注册成功！请登录");
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.error || "注册失败，请稍后重试");
      }
    } catch (err) {
      setError("注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            注册
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="用户名"
              name="name"
              autoComplete="username"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="确认密码"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="nickname"
              label="昵称（可选）"
              id="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="childName"
              label="宝宝名字（可选）"
              id="childName"
              value={formData.childName}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "注册中..." : "注册"}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => router.push("/login")}
            >
              已有账号？登录
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
