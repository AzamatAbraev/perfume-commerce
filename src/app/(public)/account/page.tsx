"use client";

import {useEffect} from "react";
import PublicAccountForm from "@/components/form/NewAccountForm";
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
    <PublicAccountForm />
  </section>;
};

export default AccountPage;
