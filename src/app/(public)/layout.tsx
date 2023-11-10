import Footer from "@/components/list/footer/Footer";
import Header from "@/components/list/header/Header";
import { ChildrenType } from "@/types/children";
import { Fragment } from "react";

import "@/general-styles/public-layout.scss"

const PublicLayout = ({ children }: ChildrenType) => {
  return (
    <Fragment>
      <Header />
      <main className="container">{children}</main>
      <footer>
        <Footer/>
      </footer>
    </Fragment>
  );
};

export default PublicLayout;
