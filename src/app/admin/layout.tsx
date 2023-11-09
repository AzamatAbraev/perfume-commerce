import React, { Fragment } from "react";
import { ChildrenType } from "@/types/children";

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
