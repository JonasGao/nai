import React from "react";
import {Container, CssBaseline, Stack,} from "@mui/material";
import Item, {FeedingRecord} from "../components/Item"
import AddForm from "../components/AddForm";

type Response = {
  content: FeedingRecord[]
}

async function getData(): Promise<Response> {
  const res = await fetch("http://127.0.0.1:8080/api/feeding-records", {
    cache: "no-store"
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const data = await getData()
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="sm" sx={{marginTop: 2, marginBottom: 2}}>
        <AddForm/>
        <Stack spacing={2}>
          {data.content.map(item => <Item key={item.id} data={item}/>)}
        </Stack>
      </Container>
    </React.Fragment>
  );
}