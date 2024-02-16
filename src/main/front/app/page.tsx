import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import AddForm from "../components/AddForm";
import AlertDialog from "../components/AlertDialog";
import Items from "../components/Items";
import { fetchPageGroup } from "./actions";

export default async function Home() {
  const data = await fetchPageGroup();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box>
          <AddForm />
        </Box>
        <Items page={data} />
        <AlertDialog />
      </Container>
    </React.Fragment>
  );
}
