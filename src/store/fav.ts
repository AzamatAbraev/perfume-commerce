"use client";

import { create } from "zustand";

import { request } from "@/server/request";
import FavType from "@/types/fav";
import CategoryType from "@/types/category";
import { FAV } from "@/constants";

interface FavouriteProducts {
  loading: boolean;
  liked: boolean;
  cart: FavType[];
  data: CategoryType[];
  getData: () => void;
  addToFav: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number,
  ) => void;
  setCart: (newCart: FavType[]) => void;
  removeFromCart: (id: string | undefined) => void;
}

const productJson =
  typeof window !== "undefined" ? localStorage.getItem(FAV) : false;
const cart = productJson ? JSON.parse(productJson) : [];

const useFav = create<FavouriteProducts>()((set, get) => ({
  loading: false,
  data: [],
  liked: false,
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

  removeFromCart: async (id) => {
    const {cart} = get();
    const newCart = cart.filter((product) => product.id !== id)
    set({cart: newCart})
    localStorage.setItem(FAV, JSON.stringify(newCart))
  },

  addToFav: async (id, image, title, description, price) => {
    const { cart } = get();
    const values: any = {
      id,
      image,
      title,
      description,
      price,
      liked: false,
    };
    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      cart.push(values);
    } else {
      cart.splice(itemIndex, 1);
    }
    set({cart})
    localStorage.setItem(FAV, JSON.stringify(cart));
  },
  setCart: (newCart: FavType[]) => {
    set({ cart: newCart });
    localStorage.setItem(FAV, JSON.stringify(get().cart));
  },
}));

export default useFav;
