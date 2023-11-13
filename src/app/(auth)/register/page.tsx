import { Metadata } from "next";

import RegisterForm from "@/components/form/RegisterForm";

export const metadata: Metadata = {
  title: "Vodiy perfume | Register",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const RegisterPage = () => {
  return <div>
    <RegisterForm/>
  </div>;
};

export default RegisterPage;
