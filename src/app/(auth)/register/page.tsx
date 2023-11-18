import { Metadata } from "next";

import PublicRegisterForm from "@/components/form/NewRegisterForm";

export const metadata: Metadata = {
  title: "Vodiy perfume | Register",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const RegisterPage = () => {
  return <div>
    <PublicRegisterForm />
  </div>;
};

export default RegisterPage;
