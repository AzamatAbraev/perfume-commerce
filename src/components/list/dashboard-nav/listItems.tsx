"use client"

import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Link from "next/link";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';

import "@/general-styles/dashboard.scss";

export const mainListItems = (
  <React.Fragment>
    <Link className="dashboard-link" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </Link>
    <Link className="dashboard-link" href="/admin/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </Link>
    <Link className="dashboard-link" href="/admin/allorders">
      <ListItemIcon>
        <Inventory2Icon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </Link>
    <Link className="dashboard-link" href="/admin/categories">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </Link>
    <Link className="dashboard-link" href="/admin/products">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </Link>
  </React.Fragment>
);