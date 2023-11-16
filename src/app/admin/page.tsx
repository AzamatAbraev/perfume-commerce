"use client";
import PaidIcon from '@mui/icons-material/Paid';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import GridOnIcon from '@mui/icons-material/GridOn';

import useUsers from "@/store/users";
import useCategories from "@/store/categories"
import useProducts from "@/store/products"
import {useEffect} from "react";

import "@/general-styles/dashboard.scss";
import "@/components/loading/Loading"

const DashboardPage = () => {
  const {getUsers, total, loading} = useUsers();
  const {data: categories, getData} = useCategories();
  const {total: products, getProducts} = useProducts();

  useEffect(() => {
    getUsers();
    getData();
    getProducts();
  }, [getUsers, getData, getProducts])

  return <div>
    <div className="dashboard__row">
      <div className="dashboard__card">
        <div className="card__top">
          <div className="card__title">
            <h3>Orders</h3>
            <p>24k</p>
          </div>
          <div className="card__image">
            <PaidIcon/>
          </div>
        </div>
        <div className="card__bottom">
          <p>+12% <span>Increase</span></p>
        </div>
      </div>
      <div className="dashboard__card">
        <div className="card__top">
          <div className="card__title">
            <h3>Total users</h3>
            <p>{total}</p>
          </div>
          <div className="card__image users__image">
            <GroupIcon/>
          </div>
        </div>
        <div className="card__bottom">
          <p>+13 <span>new users</span></p>
        </div>
      </div>
      <div className="dashboard__card">
        <div className="card__top">
          <div className="card__title">
            <h3>Total categories</h3>
            <p>{categories?.length}</p>
          </div>
          <div className="card__image categories__img">
            <CategoryIcon/>
          </div>
        </div>
        <div className="card__bottom">
          <p>+3<span>new categories</span></p>
        </div>
      </div>
      <div className="dashboard__card">
        <div className="card__top">
          <div className="card__title">
            <h3>Total Products</h3>
            <p>{products}</p>
          </div>
          <div className="card__image products__image">
            <GridOnIcon/>
          </div>
        </div>
        <div className="card__bottom">
          <p>+12<span>new products</span></p>
        </div>
      </div>
    </div>
  </div>;
};

export default DashboardPage;
