import { Metadata } from "next";

import CartCard from "@/components/card/CartCard";

import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy perfume | Cart",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const CartPage = () => {
  return <section className="cart">
    <div className="container">
      <h1 className="cart__title">My Cart</h1>
      <CartCard/>
    </div>
  </section>;
};

export default CartPage;
