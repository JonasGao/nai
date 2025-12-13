"use client";

import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Box, CircularProgress } from "@mui/material";
import AddForm from "../components/AddForm";
import AlertDialog from "../components/AlertDialog";
import LatestRecords from "../components/LatestRecords";
import MyAppBar from "../components/MyAppBar";
import { useRouter } from "next/navigation";
import { DayRecordData } from "./actions";

export default function Home() {
  const [data, setData] = useState<DayRecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    fetch("/api/current-user")
      .then((res) => {
        if (!res.ok) {
          // Not authenticated, redirect to login
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((user) => {
        if (user) {
          // User is authenticated, fetch data
          return fetch("/api/days-feeding-records");
        }
        return null;
      })
      .then((res) => {
        if (res && res.ok) {
          return res.json();
        }
        return [];
      })
      .then((records) => {
        setData(records);
        setLoading(false);
      })
      .catch(() => {
        // Error, redirect to login
        router.push("/login");
      });
  }, [router]);

  if (loading) {
    return (
      <React.Fragment>
        <CssBaseline />
        <MyAppBar />
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <MyAppBar />
      <Container maxWidth="sm">
        <AddForm />
        <LatestRecords page={data} />
        <AlertDialog />
      </Container>
    </React.Fragment>
  );
}
