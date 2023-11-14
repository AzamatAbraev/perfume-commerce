"use client";

import protectedPage from "@/hoc/with-auth";
import AccountForm from "@/components/form/AccountForm";

import "./style.scss";

const AccountPage = () => {
  return <section className="accountpage">
    <AccountForm/>
  </section>;
};

export default protectedPage(AccountPage);
