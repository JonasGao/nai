import React from "react";
import { Container, CssBaseline } from "@mui/material";
import AddForm from "../components/AddForm";
import AlertDialog from "../components/AlertDialog";
import LatestRecords from "../components/LatestRecords";
import { fetchDaysRecords } from "./actions";
import MyAppBar from "../components/MyAppBar";

export default async function Home() {
  const data = await fetchDaysRecords();
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
