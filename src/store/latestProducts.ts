import { request } from "@/server/request";
import ProductType from "@/types/product";
import { create } from "zustand";

interface LatestType {
  data: ProductType[];
  getData: () => void;
}

const useLatestProducts = create<LatestType>()((set) => ({
  data: [],
  getData: async () => {
      const {data}: {data: ProductType[]} = await request.get("last-products");
      set({ data: data });
  },
}));

export default useLatestProducts;
