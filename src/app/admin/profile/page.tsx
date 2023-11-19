"use client"

import React, { useState, useEffect, Fragment } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { request } from "@/server/request";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user";


import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from "@/components/loading/Loading";

import "./style.scss";
import "@/general-styles/new-login.scss";

const AdminAccountPage = () => {
  const router = useRouter();

  const [country, setCountry] = useState("Uzbekistan" || Cookies.get("country"))
  const [region, setRegion] = useState("Tashkent" || Cookies.get("region"))
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
    <Fragment>
      {loading ? <Loading/> : <div className="profile">
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
        <h1>Account</h1>
        <div className="profile__main">
          <div className="profile__header">
            <h3>Profile</h3>
            <p>The information can be edited</p>
            <div className="profile__password">
              <p>Password change ?</p>
              <Button onClick={handleClickOpen}>Reset</Button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="admin__account">
            <div className="profile__row">
              <div className="profile__input">
                <label htmlFor="firstName">First name</label>
                <input value={formValues.firstName} onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })} type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="profile__input">
                <label htmlFor="lastName">Last name</label>
                <input value={formValues.lastName} onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })} type="text" id="lastName" placeholder="Last name" />
              </div>
            </div>
            <div className="profile__row">
              <div className="profile__input">
                <label htmlFor="username">Username</label>
                <input value={formValues.username} onChange={(e) => setFormValues({ ...formValues, username: e.target.value })} type="text" id="username" placeholder="Username" />
              </div>
              <div className="profile__input">
                <label htmlFor="phoneNumber">Phone number</label>
                <input value={formValues.phoneNumber} onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })} type="text" id="phoneNumber" placeholder="Phone number" />
              </div>
            </div>
            <div className="profile__row">
              <div className="profile__input">
                <label htmlFor="country">Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} id="country" placeholder="Country" />
              </div>
              <div className="profile__input">
                <label htmlFor="region">Region</label>
                <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} id="region" placeholder="Region" />
              </div>
            </div>
            <div className="profile__footer">
              <button type="submit" className="profile__save__btn">
                Save details
              </button>
            </div>
          </form>
        </div>
      </div>}
    </Fragment>
  )
}

export default AdminAccountPage;