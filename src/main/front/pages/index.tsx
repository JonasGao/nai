import styles from "./page.module.css";
import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Radio,
  CardContent,
  Container,
  CssBaseline, FormControl, FormControlLabel, FormLabel, RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {margin} from "@mui/system";
import {LocalCafe} from "@mui/icons-material"
import Item, {FeedingRecord} from "../components/Item"
import AddForm from "../components/AddForm";

type Response = {
  content: FeedingRecord[]
}

export default function Home() {
  const [data, setData] = useState<Response>({content: []})
  useEffect(() => {
    fetch("/api/feeding-records")
      .then(r => r.json())
      .then(d => setData(d))
  }, [])
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="sm" sx={{marginTop: 2, marginBottom: 2}}>
        <AddForm/>
        <Stack spacing={2}>
          {data.content.map(item => <Item data={item}/>)}
        </Stack>
      </Container>
    </React.Fragment>
  );
}
