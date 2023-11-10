"use client";
import Slider from "react-slick";

import useLatestProducts from "@/store/latestProducts";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "./style.scss";
import useCart from "@/store/cart";

const Carousel = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: latestProducts, getData: getLatestProducts } =
    useLatestProducts();

  const {addToCart} = useCart();

  useEffect(() => {
    getLatestProducts();
  }, [getLatestProducts]);



  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {latestProducts?.map((product) => (
          <div className="product__border" key={product?._id}>
            <div className="products__card">
              <div className="product__img">
                <Image
                  src={
                    product?.image.url ||
                    "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png"
                  }
                  alt={product?.title || "Product"}
                  fill
                  objectFit="cover"
                />
              </div>
              <Link
                href={`/allproducts/${product?._id}`}
                className="product__content"
              >
                <h3>{product?.title || "Title"}</h3>
                <p>{product?.description || "Quality Product"}</p>
                <p>In stock: {product?.quantity || "Uknown"}</p>
                <p>Price: {product?.price || "Unknown"} UZS</p>
              </Link>
              <div className="button__wrapper">
                <button onClick={() => addToCart(product?._id)} className="product__btn">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
