import Link from "next/link";
import React from "react";

import "./style.scss";

const Footer = () => {
  return (
    <div className="container footer__container">
      <div className="footer__main">
        <p>Email: azamatabraev03@gmail.com</p>
        <p>Phone: +998 938140031</p>
      </div>
      <div className="footer__nav">
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Footer;
