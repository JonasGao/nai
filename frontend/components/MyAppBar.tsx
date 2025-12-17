"use client";

import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

type CurrentUser = {
  id: number;
  name: string;
  userType: string;
};

export default function MyAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/current-user")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data) {
          setCurrentUser(data);
        }
      })
      .catch(() => {
        // User not logged in
      });
  }, []);

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

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
    handleClose();
  };

  const handleLogin = () => {
    router.push("/login");
    handleClose();
  };

  const handleUserManagement = () => {
    router.push("/users");
    handleClose();
  };

  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Typography variant={"h6"} sx={{ flexGrow: 1 }}>
          {APP_NAME}
        </Typography>
        {currentUser && (
          <Typography variant="body2" sx={{ mr: 2 }}>
            {currentUser.name}
          </Typography>
        )}
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
            {currentUser ? (
              <>
                {currentUser.userType === "ADMIN" && (
                  <MenuItem onClick={handleUserManagement}>
                    用户管理
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>退出登录</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogin}>登录</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
