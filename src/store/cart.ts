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
  getData: () => void;
  addToCart: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number
  ) => void;
  setCart: (newCart: CartType[]) => void;
}

const productJson = typeof window !== 'undefined' ? localStorage.getItem(CART) : false;
const cart = productJson ? JSON.parse(productJson) : [];

const useCart = create<LatestType>()((set, get) => ({
  loading: false,
  quantity: 1,
  data: [],
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
    const values = {
      id: id || id + 1,
      image,
      title,
      description,
      price,
      quantity: 1,
    };

    const itemInCart = cart.find((item) => item.id === id);

    if (!itemInCart) {
      cart.push(values);
      set({cart})
      localStorage.setItem(CART, JSON.stringify(cart));
    }
  },

  setCart: (newCart: CartType[]) => {
    set({ cart: newCart })
    localStorage.setItem(CART, JSON.stringify(get().cart));
  },

}));

export default useCart;
