"use client"

import React, { useEffect, useState } from "react";
import { ChildrenType } from "@/types/children";
import { useRouter } from 'next/navigation';
import useAuth from "@/store/auth";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import { USER_DATA, USER_TOKEN } from "@/constants";
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from "@/components/list/dashboard-nav/listItems";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';

import useScreenSize from "@/utils/useScreen";
import "@/general-styles/dashboard.scss";
import { usePathname } from 'next/navigation'



const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      backgroundColor: "#093545",
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard({ children }: ChildrenType) {
  const screenSize = useScreenSize();
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const pathname = usePathname();
  console.log(pathname)

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role !== 1) {
        router.push("/")
      }
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router, user?.role])

  useEffect(() => {
    if (screenSize < 650) {
      setOpen(false);
    } else {
      setOpen(true)
    }
  }, [screenSize])
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem(USER_DATA);
    Cookies.remove(USER_TOKEN);
    setIsAuthenticated(user);
    setOpenModal(false);
    toast.info("You are logged out")
    router.push("/")
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to log out ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logout} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', position: "fixed", inset: "0" }}>
        <CssBaseline />
        <AppBar style={{backgroundColor: "#093545"}} position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              className="dashboard-toggle"
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon style={{fill: "#fff"}} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Vodiy Perfume
            </Typography>
            <IconButton style={{color: "#fff"}}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer className="dashboard-sidebar" style={{backgroundColor: "#F67449"}} variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
            
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List className="nav" component="nav">
            <React.Fragment>
              <Link className={`dashboard-link ${pathname === "/admin" ? "active" : ""}`} href="/admin">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/users" ? "active" : ""}`} href="/admin/users">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/allorders" ? "active" : ""}`} href="/admin/allorders">
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/categories" ? "active" : ""}`} href="/admin/categories">
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/products" ? "active" : ""}`} href="/admin/products">
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </Link>
            </React.Fragment>
            <Divider sx={{ my: 3, color: "#fff" }} />
            <Link className={`dashboard-link ${pathname === "/admin/profile" ? "active" : ""}`} href="/admin/profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </Link>
            <ListItemButton className="dashboard-link" onClick={handleClickOpen}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? "theme.palette.grey[100]"
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}