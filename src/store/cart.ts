import { request } from "@/server/request";
import CartType from "@/types/cart";
import CategoryType from "@/types/category";
import { LargeNumberLike } from "crypto";
import { create } from "zustand";

interface LatestType {
  loading: boolean;
  quantity: number;
  cart: CartType[];
  data: CategoryType[];
  getData: () => void;
  addToCart: (id: string) => void;
}

const useCart = create<LatestType>()((set, get) => ({
  loading: false,
  quantity: 1,
  data: [],
  cart: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: CategoryType[] } = await request.get("category");
      set({ data: data });
    } finally {
      set({ loading: true });
    }
  },
  addToCart: async (id) => {
    const { cart } = get();
    const values = {
      product: id,
      quantity: 1,
    };
    cart.push(values);
    console.log(cart);
  },
}));

export default useCart;
