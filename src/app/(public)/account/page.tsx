"use client";

import {useEffect} from "react";
import AccountForm from "@/components/form/AccountForm";
import { useRouter } from 'next/navigation';
import useAuth from "@/store/auth";

import "./style.scss";

const AccountPage = () => {
  const {isAuthenticated} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])
  
  return <section className="accountpage">
    <AccountForm/>
  </section>;
};

export default AccountPage;
