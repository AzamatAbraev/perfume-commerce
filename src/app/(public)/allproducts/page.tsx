import { Metadata } from "next";

import ProductCard from "@/components/card/ProductCard";

import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy perfume | Products",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};


const AllProductsPage = async() => {
  return (
    <section className="all-products">
      <div className="container products__container">
        <h1 className="allproducts__title">Products ()</h1>
        <ProductCard/>
      </div>
    </section>
  );
}

export default AllProductsPage;
