"use client";

import Link from "next/link";
import "@/general-styles/new-login.scss";
import Image from "next/image";
import { request } from "@/server/request";
import Cookies from "js-cookie";
import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";

import useAuth from "@/store/auth";
import { USER_DATA, USER_TOKEN } from "@/constants";
import { useRouter } from 'next/navigation'
import ROLES from "@/types/roles";

import "@/general-styles/new-register.scss";


import loginBackground from "@/assets/login.png";

const PublicRegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        password: data.get("password"),
      };

      await request.post("auth/register", userData);
      toast.success("You are registered !");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">
      <div className="login__main">
        <div className="login__header">
          <h2>Sign up</h2>
          <p>Already have an account? <Link href="/login">Sign in</Link></p>
        </div>
        <form onSubmit={handleSubmit} className="register__form">
          <input type="text" id="firstName" name="firstName" placeholder="Firstname" />
          <input type="text" id="lastName" name="lastName" placeholder="Lastname" />
          <div className="register__input">
            <input type="text" id="username" name="username" placeholder="Username" />
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone number" />
          </div>
          <input type="password" id="password" name="password" placeholder="Password" />
          <button type="submit" className="login__btn">Register</button>
        </form>
      </div>
      <div className="background-image">
        <Image alt="Login background" src={loginBackground} fill />
      </div>
    </section>
  )
}

export default PublicRegisterForm;