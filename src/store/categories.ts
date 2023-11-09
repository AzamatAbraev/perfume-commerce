import { request } from "@/server/request";
import CategoryType from "@/types/category";
import ProductType from "@/types/product";
import { create } from "zustand";

interface LatestType {
  loading: boolean;
  data: CategoryType[];
  getData: () => void;
}

const useCategories = create<LatestType>()((set) => ({
  loading: false,
  data: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: CategoryType[] } = await request.get(
        "category"
      );
      set({ data: data });
    } finally {
      set({ loading: true });
    }
  },
}));

export default useCategories;
