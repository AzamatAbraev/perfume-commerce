import { Metadata } from "next";
import AccountForm from "@/components/form/AccountForm";

import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy perfume | Account",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const AccountPage = () => {
  return <div>
    <AccountForm/>
  </div>;
};

export default AccountPage;
