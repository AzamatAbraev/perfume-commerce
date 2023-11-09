"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useScreenSize from "@/utils/useScreen";

import ShoppingCartIconOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuIcon from "@mui/icons-material/Menu";

import "./style.scss";

const Header = () => {
  const screenSize = useScreenSize();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (screenSize > 650) {
      setIsNavOpen(false);
    }
  }, [screenSize]);

  const controlNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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
                <FavoriteBorderOutlinedIcon />
                <p>Favourite</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/cart">
                <ShoppingCartIconOutlined />
                <p>My Cart</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__login" href="/login">
                Login
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__register" href="/register">
                Register
              </Link>
            </li>
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
                  <FavoriteBorderOutlinedIcon />
                  <p>Favourite</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/cart">
                  <ShoppingCartIconOutlined />
                  <p>My Cart</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__login" href="/login">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__register" href="/register">
                  Register
                </Link>
              </li>
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
