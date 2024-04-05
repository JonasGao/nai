"use client";

import React from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { APP_NAME } from "../util/Constants";
import MoreIcon from "@mui/icons-material/MoreVert";

export default function MyAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRefresh = () => {
    if (confirm("Are you sure to refresh?")) {
      location.reload();
    }
  };
  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Typography variant={"h6"} sx={{ flexGrow: 1 }}>
          {APP_NAME}
        </Typography>
        <div>
          <IconButton color={"inherit"} onClick={handleMenu}>
            <MoreIcon />
          </IconButton>
          <Menu
            id={"my-app-menu"}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleRefresh}>Refresh</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
