"use client";

import useCart from "@/store/cart";
import ProductType from "@/types/product";

import "./style.scss";


const AddButton = (product: ProductType) => {
  const {addToCart, cart} = useCart();

  const isProductInCart = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };
  return (
    <button
      onClick={() =>
        addToCart(
          product?._id,
          product?.image.url,
          product?.title,
          product?.description,
          product?.price,
        )
      }
      className={isProductInCart(product?._id) ? "add-in-cart" : "add__btn"}
    >
      {isProductInCart(product?._id) ? "Added" : "Add to cart"}
    </button>
  )
}

export default AddButton