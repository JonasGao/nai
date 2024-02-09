import styles from "./page.module.css";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Container, CssBaseline, Stack, Typography} from "@mui/material";
import {margin} from "@mui/system";
import {LocalCafe} from "@mui/icons-material"

type FeedingRecord = {
date:string,time:string,operation:string,value1:number,value2:number
}

type ItemProps = {
  data: FeedingRecord
}

function Item(props:ItemProps) {
  const {data} = props;
 return (
   <Card>
     <CardContent>
       <Typography variant={"body1"} display={"inline"}>
         {data.date} {data.time}
       </Typography>
       <LocalCafe/>
       <Typography display={"inline"}>
         {data.operation}
       </Typography>
         <Typography display={"inline"}>
         {data.value1}
       </Typography>
         <Typography display={"inline"}>
         {data.value2}
       </Typography>
     </CardContent>
   </Card>
 )
}

export default function Home() {
  const [data, setData] = useState({content:[]})
  useEffect(() => {
    fetch("/api/feeding-records")
      .then(r => r.json())
      .then(d => setData(d))
  }, [])
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="sm" sx={{marginTop: 2, marginBottom: 2}}>
        <Stack spacing={2}>
          {data.content.map(item => <Item data={item}/>)}
        </Stack>
      </Container>
    </React.Fragment>
  );
}
