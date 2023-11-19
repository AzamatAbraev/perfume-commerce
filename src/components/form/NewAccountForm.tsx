"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from "@/server/request";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import "@/general-styles/new-login.scss";



export default function PublicAccountForm() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
  });


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("auth/me");
        setUserInfo(data);
        setFormValues({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          phoneNumber: data.phoneNumber || "",
        });
      } finally {
        setLoading(false);
      }
    }
    getUserInfo();
  }, [setUserInfo])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        username: data.get("username"),
        phoneNumber: data.get("phoneNumber"),
      };

      await request.put("auth/update", userData);
      toast.success("Your information is saved successfully!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };

  const resetPassword = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = {
      currentPassword: event.currentTarget.currentPassword.value,
      newPassword: event.currentTarget.newPassword.value,
    }
    await request.put("auth/password", password);
    toast.success("Password changed");
    router.push("/");
  }

  return (
    <div className="public-account">
      <div className="login__main public-account-main">
        <div className="login__header account__header">
          <h2 className="account-title">Account</h2>
          <p>Do you want to change your password ? <Button className="password-redirect-btn" onClick={handleClickOpen}>Password</Button></p>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <input type="text" id="firstName" name="firstName" value={formValues.firstName} onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })} placeholder="Fistname" />
          <input type="text" id="lastName" name="lastName" value={formValues.lastName} onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })} placeholder="Lastname" />
          <input type="text" id="username" name="username" value={formValues.username} onChange={(e) => setFormValues({ ...formValues, username: e.target.value })} placeholder="Username" />
          <input type="text" id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })} placeholder="Password" />
          <button type="submit" className="login__btn">Save Info</button>
        </form>
        <Dialog open={open} onClose={handleClose}>
          <form className="password-form" onSubmit={resetPassword}>
            <DialogTitle className="password-form-title">Password</DialogTitle>
            <DialogContent>
              <input type="password" id="currentPassword" name="currentPassword" placeholder="Current password" />
              <input type="password" id="newPassword" name="newPassword" placeholder="New password" />
            </DialogContent>
            <DialogActions>
              <button type="button" onClick={handleClose}>Cancel</button>
              <button type="submit">Reset</button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
