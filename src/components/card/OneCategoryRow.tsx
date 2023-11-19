"use client";
import { usePathname } from 'next/navigation';
import {useEffect, useState, Fragment} from "react";
import {request} from "@/server/request";
import Pagination from '@mui/material/Pagination';
import Image from "next/image";
import ProductType from "@/types/product";
import useCart from "@/store/cart";
import useFav from "@/store/fav";
import Link from "next/link";
import { LIMIT } from "@/constants";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import Loading from "@/components/loading/Loading"

import "@/general-styles/product-card.scss";




const OneCategoryRow = () => {
  const {addToCart, cart: cartItems } = useCart();
  const {addToFav, cart} = useFav();

  const pathname = usePathname();
  const categoryId = pathname.split("/")[2];

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [categoryName, setCategoryName] = useState("")

  const controlPages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const isProductInFav = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((cartProduct) => cartProduct.id === productId);
  };

  useEffect(() => {
    const getCategoryName = async () => {
      const {data} = await request.get(`category/${categoryId}`)
      setCategoryName(data?.name)
    }
    const getOneCategory = async() => {
      try {
        setLoading(true);
        const {data: {total, products}} = await request.get(`product?category=${categoryId}&page=${page}`);
        setProducts(products);
        setTotal(total);
      } finally {
        setLoading(false);
      }
    }
    getOneCategory();
    getCategoryName();
  }, [categoryId, page])

  return (<Fragment>
      {loading ? <Loading/> : <div>
        <h1 style={{paddingTop: "50px", paddingBottom: "50px", fontSize: "50px"}}>{categoryName}</h1>
        <div className="allproducts__row">
          {products?.map((product: ProductType) => (
            <div key={product?._id} className="allproducts__card">
              <div className="product__img">
                <Image
                  src={product?.image.url}
                  alt={product?.title || "Product"}
                  fill
                  objectFit="cover"
                />
                <button onClick={() => addToFav(product?._id,
                  product?.image.url,
                  product?.title,
                  product?.description,
                  product?.price)} className="favourite__btn">
                  {isProductInFav(product?._id) ? <FavoriteIcon /> : <FavoriteBorderIconOutlined />}
                </button>
                <div className="category__info">{product?.category.name}</div>
              </div>
              <Link
                href={`/allproducts/${product?._id}`}
                className="allproducts__content"
              >
                <h3>{product?.title || "Title"}</h3>
                <p>{product?.description || "Quality Product"}</p>
                <p>Sold: {product?.sold}</p>
                <p>In stock: {product?.quantity || "Unknown"}</p>
                <p>Price: {product?.price || "Unknown"} UZS</p>
              </Link>
              <div className="button__wrapper">
                <button
                  onClick={() =>
                    addToCart(
                      product?._id,
                      product?.image.url,
                      product?.title,
                      product?.description,
                      product?.price
                    )
                  }
                  className={isProductInCart(product?._id) ? "in-cart" : "product__btn"}
                >
                  {isProductInCart(product?._id) ? "Added" : "Add to cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {(total / LIMIT) > 1 ? <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(event, value) => controlPages(event, value)}
            boundaryCount={2}
          /> : null}
        </div>
      </div>}
    </Fragment>
  )

}

export default OneCategoryRow;