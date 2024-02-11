"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useMemo, useState} from "react";

type AlertDialogState = {
  title?: string, message: string | null, open: boolean
}

const defState = {open: false, message: null}

export type AlertErrorDetail = {
  title?: string, message: string
}

export default function AlertDialog() {
  const [{open, title, message}, setState] = useState<AlertDialogState>(defState)
  const handleClose = useMemo(() => () => {
    setState(defState)
  }, [setState])
  useEffect(() => {
    const listener = (event: CustomEvent<AlertErrorDetail>) => {
      setState({open: true, title: event.detail.title, message: event.detail.message})
    };
    document.addEventListener("alert-error", listener)
    return () => {
      document.removeEventListener("alert-error", listener)
    }
  }, [])
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        {title && (
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
