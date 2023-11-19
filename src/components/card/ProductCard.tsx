"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { InputBase} from "@mui/material";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/material/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import useCart from "@/store/cart";
import useFav from "@/store/fav";
import { request } from "@/server/request";


import ProductType from "@/types/product";
import { LIMIT } from "@/constants";

import "@/general-styles/product-card.scss";

interface ParamTypes {
  limit: number,
  search: string,
  page: number,
  sort: string,
  category?: string,
}

const ProductCard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState("");

  const {addToCart, cart: cartItems } = useCart();
  const {addToFav, cart} = useFav();

  useEffect(() => {
    const getCategories = async() => {
      const {data: categories} = await request.get("category");
      setCategories(categories)
    }
    getCategories();

    const getProducts = async() => {
      const params: ParamTypes = {
        page,
        limit: LIMIT,
        search,
        sort: price || sales,
      };
      if (category) {
        params.category = category;
      } 
      const {data: {products, total}} = await request.get("product", {params});
      setProducts(products)
      setTotal(total);
    }
    getProducts();
  }, [setCategories, setProducts, page, search, category, price, sales])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  }

  const sortByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const controlPages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const isProductInFav = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((cartProduct) => cartProduct.id === productId);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(event.target.value);
    setPage(1);
  };

  const handleSalesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSales(event.target.value);
    setPage(1);
  }



  return (
    <div>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Searching..."
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearch(event)}
          inputProps={{ "aria-label": "search products" }}
        />
        <select onChange={(event) => handleSortChange(event)} className="category-sort" style={{ height: "100%" }}>
          <option value="">Price</option>
          <option value="-price">10-1</option>
          <option value="price">1-10</option>
        </select>
        <select onChange={(event) => handleSalesChange(event)} className="category-sort" style={{ height: "100%" }}>
          <option value="">Sales</option>
          <option value="sold">Least popular</option>
          <option value="-sold">Most popular</option>
        </select>
        <select onChange={(event) => sortByCategory(event)} className="category-sort" style={{ height: "100%" }}>
          <option value="" style={{ height: "100%" }}>
            All
          </option>
          {categories?.map((category: { _id: string; name: string }) => (
            <option
              key={category?._id}
              style={{ height: "100%" }}
              value={category?._id}
            >
              {category?.name}
            </option>
          ))}
        </select>

      </Paper>
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
              <h3><span>{product?.title || "Title"}</span></h3>
              <p><span>{product?.description || "Quality Product"}</span></p>
              <p>Sold: <span>{product?.sold}</span></p>
              <p>In stock: <span>{product?.quantity || "Unknown"}</span></p>
              <p className="product__price">Price: <span>{product?.price || "Unknown"}</span> UZS</p>
            </Link>
            <div className="button__wrapper product__footer">
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
    </div>
  );
};

export default ProductCard;
