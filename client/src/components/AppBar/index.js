import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/MenuSharp";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Auth from "../../utils/auth";
import MenuList from "@mui/material/MenuList";
import Avatar from "./Avatar";
import { Stack, Button, Item } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "../../styles/appBar.css";
import ChevronRightIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ChevronLeftIcon from "@mui/icons-material/ArrowBackIosNewSharp";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function showNavigation() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (Auth.loggedIn()) {
    return <Avatar />;
  } else {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ pr: 2 }}
      >
        <Button
          variant="primary"
          href="/login"
          sx={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          href="/register"
          sx={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          Register
        </Button>
      </Stack>
    );
  }
}

function drawerNavigation() {
  if (Auth.loggedIn()) {
    return (
      <MenuItem>
        <Link className="menu-link" to="/profile">
          My Profile
        </Link>
      </MenuItem>
    );
  } else {
    return (
      <div>
        <MenuItem>
          <Link className="menu-link" to="/login">
            Sign In
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="menu-link" to="/register">
            Register
          </Link>
        </MenuItem>
      </div>
    );
  }
}

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", mb: 25 }} className="nav-bar">
      <CssBaseline />
      <AppBar position="fixed" open={open} className="nav-bar" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }} className="nav-bar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              color: "black",
              ml: 3,
            }}
          >
            <MenuIcon sx={{ width: 33, height: 33, fontWeight: "light" }} />
          </IconButton>
          <Box noWrap component="div">
            <Link to="/">
              <img
                src={logo}
                alt="football evolution training logo"
                className="fetLogo"
              />
            </Link>
          </Box>
          {showNavigation()}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon fontSize="medium" />
            ) : (
              <ChevronRightIcon fontSize="medium" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList dense>
          <MenuItem>
            <Link to="/" className="menu-link" onClick={handleDrawerClose}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/aboutUs"
              className="menu-link"
              onClick={handleDrawerClose}
            >
              About Us
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/trainWithUs"
              className="menu-link"
              onClick={handleDrawerClose}
            >
              Train With Us
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/academies"
              className="menu-link"
              onClick={handleDrawerClose}
            >
              The FET Academy
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/camps" className="menu-link" onClick={handleDrawerClose}>
              Camps
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/tournaments"
              className="menu-link"
              onClick={handleDrawerClose}
            >
              Tournaments
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/epl" className="menu-link" onClick={handleDrawerClose}>
              Evolution Premier League
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/memberships"
              className="menu-link"
              onClick={handleDrawerClose}
            >
              Memberships
            </Link>
          </MenuItem>
          <Divider />
          {drawerNavigation()}
        </MenuList>
      </Drawer>
    </Box>
  );
}
