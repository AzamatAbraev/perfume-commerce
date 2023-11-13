"use client"

import React, {useState, useEffect, Fragment} from "react";
import Image from "next/image";

import useCart from "@/store/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartType from "@/types/cart";

import "./style.scss";

const CartCard = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cart, setCart } = useCart();

  let newCart: (CartType | null)[] = cart.map((product: CartType) => ({
    ...product,
  }));

  const increaseQuantity = (id: string) => {
    newCart = newCart.map((product) => {
      if (product?.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 0) + 1,
        };
      } else {
        return product;
      }
    }) as (CartType | null)[];

    setCart(newCart.filter(Boolean) as CartType[]);
  };


  const decreaseQuantity = (id: string) => {
    newCart = newCart.map((product) => {
      if (product?.id === id) {
        const newQuantity = Math.max((product.quantity || 0) - 1, 0);
        if (newQuantity === 0) {
          return null;
        } else {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
      } else {
        return product;
      }
    }) as (CartType | null)[];

    newCart = newCart.filter(Boolean) as (CartType | null)[];

    setCart(newCart.filter(Boolean) as CartType[]);
  };

    useEffect(() => {
    const newTotalPrice = newCart.reduce((acc, product) => {
      return acc + (product?.price || 0) * (product?.quantity || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [newCart]);


  return (
    <Fragment>
      {cart.length !== 0 ? <div className="cart__row">
        {newCart?.map((product) => (
          <div key={product?.id} className="cart__card">
            <div className="cart__image">
              <Image
                src={
                  product?.image ||
                  "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png"
                }
                alt={product?.title || "Uknown"}
                fill
                objectFit="contain"
              />
            </div>
            <div className="cart__content">
              <h3>Name: {product?.title || "Mahsulot"}</h3>
              <p>Description: {product?.description || "Mavjud emas"}</p>
              <p>Quantity: {product?.quantity || 0}</p>
              <p>
                Price: {product ? product?.price * product?.quantity : "Mavjud emas"}UZS
              </p>
              <div className="cart__button__container">
                <button onClick={() => decreaseQuantity(product?.id || "id1")}>
                  <RemoveIcon />
                </button>
                <span>{product?.quantity || 0}</span>
                <button onClick={() => increaseQuantity(product?.id || "id")}>
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart__order">
          <h3>Total Amount: {totalPrice} UZS </h3>
          <button>Order</button>
        </div>
      </div> : (
      <div className="nodata__found">
        <h1>
          No data found...
        </h1>
      </div>)}
    </Fragment>
  );
};

export default CartCard;
