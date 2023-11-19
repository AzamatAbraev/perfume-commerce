import { Fragment } from "react";

import Footer from "@/components/list/footer/Footer";
import Header from "@/components/list/header/Header";

import { ChildrenType } from "@/types/children";

import 'react-toastify/dist/ReactToastify.css';
import "@/general-styles/public-layout.scss";

const PublicLayout = ({ children }: ChildrenType) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default PublicLayout;
