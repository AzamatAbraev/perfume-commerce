import { Metadata } from "next";
"use client";

import AccountForm from "@/components/form/AccountForm";

import "./style.scss";
import protectedPage from "@/hoc/with-auth";

const AccountPage = () => {
  return <section className="accountpage">
    <AccountForm/>
  </section>;
};

export default protectedPage(AccountPage);
