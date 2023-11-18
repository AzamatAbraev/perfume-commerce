"use client"

import { request } from "@/server/request";
import { UserType } from "@/types/user"
import { create } from "zustand"
import {toast} from "react-toastify";

interface NewUserType {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
}

interface AllUsersType {
  loading: boolean,
  search: string,
  page: number,
  total: number;
  users: UserType[],

  getUsers: (page?: number, search?: string) => void;
  addUser: (user: NewUserType, selected: string | null) => void;
  editUser: (user: NewUserType, id: string) => void;
  deleteUser: (id: string) => void;
}

const useUsers = create<AllUsersType>()((set, get) => ({
  loading: false,
  search: "",
  page: 1,
  total: 0,
  selected: null,
  users: [],

  getUsers: async (page, search) => {
    try {
      set({loading: true})
      const params = {
        page,
        search,
      }
      const {data: {users, total}} = await request.get("user", {params});
      set({users, total})
    } finally {
      set({loading: false})
    }
  },
  
  addUser: async (user, selected) => {
    try {
      set({loading: true});
      if (selected === null) {
        await request.post("user", user);
      } else {
        await request.put(`user/${selected}`, user)
      }
      toast.success("Changed successfully");
      get().getUsers();
    } finally {
      set({loading: false})
    }
  },
  editUser: async (user, id) => {
    try {
      set({loading: true})
      await request.put(`user/${id}`, user);
      toast.success("Information edited successfully");
    } finally {
      set({loading: false})
    }
  },

  deleteUser: async(id) => {
    try {
      set({loading: true});
      await request.delete(`user/${id}`);
      await get().getUsers();
      toast.info("User deleted");
    } finally {
      set({loading: false})
    }
  },
    
}))

export default useUsers;