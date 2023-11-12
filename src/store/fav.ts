"use client";

import { CART } from "@/constants";
import { request } from "@/server/request";
import FavType from "@/types/fav";
import CategoryType from "@/types/category";
import { create } from "zustand";

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
    price: number
  ) => void;
  setCart: (newCart: FavType[]) => void;
}

const productJson =
  typeof window !== "undefined" ? localStorage.getItem("FAV") : false;
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

  addToFav: async (id, image, title, description, price) => {
    const { cart } = get();
    const values = {
      id,
      image,
      title,
      description,
      price,
      liked: false,
    };
    cart.push(values);
    set({ cart });
    localStorage.setItem("FAV", JSON.stringify(cart));
  },
  setCart: (newCart: FavType[]) => {
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(get().cart));
  },
}));

export default useFav;
