"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useScreenSize from "@/utils/useScreen";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

import useCart from "@/store/cart";
import useFav from "@/store/fav";
import useAuth from "@/store/auth";

import ShoppingCartIconOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';

import { USER_DATA, USER_TOKEN } from "@/constants";


import "./style.scss";

const Header = () => {
  const screenSize = useScreenSize();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [totalFav, setTotalFav] = useState(0);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [ordersTotal, setOrdersTotal] = useState(0);

  const {isAuthenticated, user, setIsAuthenticated} = useAuth();
  const { cart, orders, getOrders } = useCart();
  const { cart: favCart } = useFav();

  const router = useRouter();

  useEffect(() => {
    if (screenSize > 650) {
      setIsNavOpen(false);
    }

  }, [screenSize]);

  const controlNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    getOrders();
  }, [getOrders])

  const logout = () => {
    localStorage.removeItem(USER_DATA);
    Cookies.remove(USER_TOKEN);
    setIsAuthenticated(user);
    handleClose();
    toast.info("You are logged out")
    router.push("/")
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setTotalCart(cart.length);
    setTotalFav(favCart.length)
    setAuthenticated(isAuthenticated)
    setOrdersTotal(orders.length);
  }, [cart.length, favCart.length, isAuthenticated, orders.length])

  return (
    <header>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to log out ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logout} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
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
                <Badge badgeContent={totalFav} color="secondary">
                    <FavoriteBorderOutlinedIcon />
                </Badge>
                <p>Favourite</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/cart">
                <Badge badgeContent={totalCart} color="secondary">
                  <ShoppingCartIconOutlined />
                </Badge>
                <p>My Cart </p>
              </Link>
            </li>
            {isAuthenticated && user?.role === 0 ? (<li className="nav__item">
                <Link className="nav__cart" href="/orders">
                  <Badge badgeContent={ordersTotal} color="secondary">
                    <PaymentIcon />
                  </Badge>
                  <p>Orders</p>
                </Link>
              </li>) : null}
             {authenticated ? (<li className="nav__item">
                <Link className="nav__login" href={user?.role !== 1 ? `/account` : `/admin`}>
                  {user?.role === 0 ? user?.firstName : "Dashboard"}
                </Link>
              </li>): (<li className="nav__item">
                <Link className="nav__login" href="/login">
                  Login
                </Link>
              </li>)}
              {authenticated ? (<li className="nav__item">
                <button onClick={handleClickOpen} className="nav__register__btn">
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
                  <Badge badgeContent={totalFav} color="secondary">
                    <FavoriteBorderOutlinedIcon />
                  </Badge>
                  <p>Favourite</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/cart">
                  <Badge badgeContent={totalCart} color="secondary">
                    <ShoppingCartIconOutlined />
                  </Badge>
                  <p>My Cart</p>
                </Link>
              </li>
              {isAuthenticated ? (<li className="nav__item">
                <Link className="nav__cart" href="/orders">
                  <Badge badgeContent={ordersTotal} color="secondary">
                    <PaymentIcon />
                  </Badge>
                  <p>Orders</p>
                </Link>
              </li>) : null}
              {authenticated ? (<li className="nav__item">
                <Link className="nav__login" href="/account">
                  {user?.firstName}
                </Link>
              </li>): (<li className="nav__item">
                <Link className="nav__login" href="/login">
                  Login
                </Link>
              </li>)}
              {authenticated ? (<li className="nav__item">
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
