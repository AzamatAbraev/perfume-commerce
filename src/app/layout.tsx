import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ChildrenType } from "@/types/children";
import { ToastContainer } from "react-toastify";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "../../globals.scss";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vodiy perfume",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
