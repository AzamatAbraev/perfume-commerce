"use client"

import useFav from "@/store/fav";
import "./style.scss";
import Image from "next/image";
import FavType from "@/types/fav";


const FavouriteCard = () => {
  const { cart, setCart } = useFav();

  let newCart: (FavType | null)[] = cart.map((product: FavType) => ({
    ...product,
  }));

  return (
    <div className="cart__row">
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
            <p>
              Price: {product?.price || "Mavjud emas"}UZS
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouriteCard;
