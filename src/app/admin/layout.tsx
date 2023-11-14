"use client"

import React, { Fragment, useEffect } from "react";
import { ChildrenType } from "@/types/children";
import { useRouter } from 'next/navigation';
import useAuth from "@/store/auth";

const AdminLayout = ({ children }: ChildrenType) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role !== 1) {
        router.push("/")
      }
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router, user?.role])
  return (
    <Fragment>
      <header>Admin Header</header>
      <main>{children}</main>
      <footer></footer>
    </Fragment>
  );
};

export default AdminLayout;
