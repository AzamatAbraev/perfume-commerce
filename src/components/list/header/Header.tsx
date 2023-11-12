"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useScreenSize from "@/utils/useScreen";

import ShoppingCartIconOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import useCart from "@/store/cart";
import useFav from "@/store/fav";
import useAuth from "@/store/auth";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import { USER_DATA, USER_TOKEN } from "@/constants";


import "./style.scss";

const Header = () => {
  const screenSize = useScreenSize();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { cart } = useCart();
  const { cart: favCart } = useFav();
  const {isAuthenticated, user, setIsAuthenticated} = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (screenSize > 650) {
      setIsNavOpen(false);
    }
  }, [screenSize]);

  const controlNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const logout = () => {
    localStorage.removeItem(USER_DATA);
    Cookies.remove(USER_TOKEN);
    setIsAuthenticated(user)
    router.push("/")
  }

  return (
    <header>
      <nav className="nav">
        <div className="container nav__container">
          <div className="nav__logo">
            <Link href="/">Logo</Link>
          </div>
          <ul className="nav__menu">
            <li className="nav__item">
              <Link className="nav__cart" href="/allproducts">
                <Inventory2OutlinedIcon />
                <p>Products</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/favourite">
                <Badge badgeContent={favCart.length} color="secondary">
                    <FavoriteBorderOutlinedIcon />
                </Badge>
                <p>Favourite</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/cart">
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIconOutlined />
                </Badge>
                <p>My Cart </p>
              </Link>
            </li>
             {isAuthenticated ? (<li className="nav__item">
                <Link className="nav__login" href="/account">
                  {user?.firstName}
                </Link>
              </li>): (<li className="nav__item">
                <Link className="nav__login" href="/login">
                  Login
                </Link>
              </li>)}
              {isAuthenticated ? (<li className="nav__item">
                <button onClick={logout} className="nav__register__btn">
                  Logout
                </button>
              </li>) : (<li className="nav__item">
                <Link className="nav__register" href="/register">
                  Register
                </Link>
              </li>)}
          </ul>
          {isNavOpen ? (
            <ul className="nav__res__menu">
              <li className="nav__item">
                <Link className="nav__cart" href="/allproducts">
                  <Inventory2OutlinedIcon />
                  <p>Products</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/favourite">
                  <Badge badgeContent={favCart.length} color="secondary">
                    <FavoriteBorderOutlinedIcon />
                  </Badge>
                  <p>Favourite</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/cart">
                  <Badge badgeContent={cart.length} color="secondary">
                    <ShoppingCartIconOutlined />
                  </Badge>
                  <p>My Cart</p>
                </Link>
              </li>
              {isAuthenticated ? (<li className="nav__item">
                <Link className="nav__login" href="/account">
                  {user?.firstName}
                </Link>
              </li>): (<li className="nav__item">
                <Link className="nav__login" href="/login">
                  Login
                </Link>
              </li>)}
              {isAuthenticated ? (<li className="nav__item">
                <button onClick={logout} className="nav__register__btn">
                  Logout
                </button>
              </li>) : (<li className="nav__item">
                <Link className="nav__register" href="/register">
                  Register
                </Link>
              </li>)}
            </ul>
          ) : null}
        </div>
        <div className="hamburger">
          <button onClick={controlNav} className="nav__menu__btn">
            <MenuIcon fontSize="large" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
