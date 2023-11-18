"use client";

import { request } from "@/server/request";
import { UserType } from "@/types/user";
import { create } from "zustand";
import { toast } from "react-toastify";
import ProductType from "@/types/product";

interface Product {
  title: string,
  category: string,
  price: string | string,
  quantity: number | string,
  image: object,
}

interface AllProductsType {
  loading: boolean;
  search: string;
  page: number;
  total: number;
  products: ProductType[];

  getProducts: (page?: number, search?: string) => void;
  addProduct: (product: Product, selected: string | null) => void;
  editProduct: (product: Product, id: string) => void;
  deleteProduct: (id: string) => void;
}

const useProducts = create<AllProductsType>()((set, get) => ({
  loading: false,
  search: "",
  page: 1,
  total: 0,
  selected: null,
  products: [],

  getProducts: async (page, search) => {
    try {
      set({loading: true})
      const params = {
        page,
        search,
      };
      const {
        data: { products, total },
      } = await request.get("product", { params });
      set({ products, total });
    } finally {
      set({loading: false})
    }
  },

  addProduct: async (product, selected) => {
    try {
      set({ loading: true });
      if (selected === null) {
        await request.post("product", product);
      } else {
        await request.put(`product/${selected}`, product);
      }
      toast.success("Changed successfully");
      get().getProducts();
    } finally {
      set({ loading: false });
    }
  },
  editProduct: async (product, id) => {
    try {
      set({ loading: true });
      await request.put(`product/${id}`, product);
      toast.success("Information edited successfully");
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    try {
      set({ loading: true });
      await request.delete(`product/${id}`);
      await get().getProducts();
      toast.info("Product deleted");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProducts;
