"use client"

import React, { Fragment } from "react";
import { ChildrenType } from "@/types/children";
import protectedPage from "@/hoc/with-auth";

const AdminLayout = ({ children }: ChildrenType) => {
  return (
    <Fragment>
      <header>Admin Header</header>
      <main>{children}</main>
      <footer></footer>
    </Fragment>
  );
};

export default AdminLayout;
