import Header from "@/components/list/header/Header";
import { ChildrenType } from "@/types/children";
import { Fragment } from "react";

const PublicLayout = ({ children }: ChildrenType) => {
  return (
    <Fragment>
      <Header />
      <main className="container">{children}</main>
      <footer></footer>
    </Fragment>
  );
};

export default PublicLayout;
