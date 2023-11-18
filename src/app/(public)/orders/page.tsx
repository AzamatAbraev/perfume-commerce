"use client";

import {useEffect, useState} from "react";
import { request } from "@/server/request";
import Image from "next/image";
import Alert from '@mui/material/Alert';

import "./style.scss";


interface Image {
  public_id: string;
  url: string;
}

interface Product {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: Image;
  quantity: number;
  createdAt: string,
}

interface CartItem {
  _id: string;
  product: Product;
}

interface Order {
  status: string;
  _id: string;
  userId: string;
  cart: CartItem[];
}


const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);


  useEffect(() => {
      const getUserPayments = async () => {
        const { data } = await request.get("auth/payments");
        setOrders(data);
        const products = data.map((order: Order) => order.cart.map((item: any) => item.product)).flat();
        setOrderProducts(products);
      };
      getUserPayments();
  }, [])



  return <div className="container">
    <h1 className="order__title">Latest Orders</h1>
    <div className="order__row">
      {orderProducts.map((product) => (
        <div key={product?._id} className="order__card">
          <div className="order__image">
            <Image src={product?.image?.url} alt={product?.title} width={50} height={50} />
          </div>
          <h2>{product?.title}</h2>
          <p>{product?.price} UZS</p>
          <p>{product?.createdAt.split("T")[0]}</p>
          <h3 className="status">Accepted</h3>
        </div>
      ))}
    </div>
    <Alert className="alert" severity="info">In case there is any problem, feel free to reach out to us !</Alert>
  </div>;
};

export default OrdersPage;
