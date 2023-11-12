import { ToastContainer } from 'react-toastify';
import Footer from "@/components/list/footer/Footer";
import Header from "@/components/list/header/Header";
import { ChildrenType } from "@/types/children";
import { Fragment } from "react";

import 'react-toastify/dist/ReactToastify.css';
import "@/general-styles/public-layout.scss";

const PublicLayout = ({ children }: ChildrenType) => {
  return (
    <Fragment>
      <ToastContainer/>
      <Header />
      <main className="container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default PublicLayout;
