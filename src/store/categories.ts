import { request } from "@/server/request";
import CategoryType from "@/types/category";
import { create } from "zustand";
import {toast} from "react-toastify";

interface LatestType {
  loading: boolean;
  data: CategoryType[];
  getData: () => void;
  addCategory: (category: {name: string, image: object}, selected: string | null) => void;
  deleteCategory: (id: string) => void;
}

const useCategories = create<LatestType>()((set, get) => ({
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
      set({ loading: false });
    }
  },

  addCategory: async (category, selected) => {
    try {
      set({ loading: true });
      if (selected === null) {
        await request.post("category", category);
      } else {
        await request.put(`category/${selected}`, category);
      }
      toast.success("Changed successfully");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ loading: true });
      await request.delete(`category/${id}`);
      await get().getData();
      toast.info("Category deleted");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategories;
