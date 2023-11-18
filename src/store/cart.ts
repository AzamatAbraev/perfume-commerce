"use client"

import { CART } from "@/constants";
import { request } from "@/server/request";
import CartType from "@/types/cart";
import CategoryType from "@/types/category";
import { create } from "zustand";

interface LatestType {
  loading: boolean;
  quantity: number;
  cart: CartType[];
  data: CategoryType[];
  orders: [],
  getData: () => void;
  addToCart: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number,
  ) => void;
  setCart: (newCart: CartType[]) => void;
  getOrders: () => void;
}

const productJson = typeof window !== 'undefined' ? localStorage.getItem(CART) : false;
const cart = productJson ? JSON.parse(productJson) : [];

const useCart = create<LatestType>()((set, get) => ({
  loading: false,
  quantity: 1,
  data: [],
  orders: [],
  cart,

  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: CategoryType[] } = await request.get("category");
      set({ data: data });
    } finally {
      set({ loading: true });
    }
  },

  addToCart: (id, image, title, description, price) => {
    const { cart } = get();
    const values: any = {
      id: id || Date.now().toString(),
      image,
      title,
      description,
      price,
      quantity: 1,
    };

    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      cart.push(values);
    } else {
      cart.splice(itemIndex, 1);
    }
    set({cart})
    localStorage.setItem(CART, JSON.stringify(cart));
    
  },

  setCart: (newCart: CartType[]) => {
    set({ cart: newCart })
    localStorage.setItem(CART, JSON.stringify(get().cart));
  },

  getOrders: async() => {
    const { data } = await request.get("auth/payments");
    set({orders: data});
  },


}));

export default useCart;
