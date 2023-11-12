import { UserType } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import { USER_TOKEN, USER_DATA } from "@/constants";

interface AuthState {
  isAuthenticated: boolean,
  user: UserType | null, 
  setIsAuthenticated: (user: UserType | null) => void; 
}

const userJson = typeof window !== "undefined" ? localStorage.getItem(USER_DATA) : false;
const user = userJson ? JSON.parse(userJson) : null;

const useAuth = create<AuthState>()((set, get) => ({
  isAuthenticated: Boolean(Cookies.get(USER_TOKEN)) || false,
  user,
  setIsAuthenticated: (user) => {
    const {isAuthenticated} = get();
    set({isAuthenticated: !isAuthenticated, user, })
  },
})) 

export default useAuth;