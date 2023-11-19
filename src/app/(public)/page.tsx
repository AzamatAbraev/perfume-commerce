import Link from "next/link";
import Image from "next/image";

import Carousel from "@/components/slider/Slider";
import CategoryRow from "@/components/card/CategoryCard";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import shopping from "@/assets/shopping-main.webp";

import "@/general-styles/public-home.scss";

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <div className="home__intro">
          <div className="home__intro__image">
            <Image src={shopping} alt="Home background" fill />
          </div>
          <div className="home__intro__content">
            <h2>50% discounts on Fridays</h2>
            <p>Buy three products amounting to over 100k UZS and you will get a 50% discount on any item for your next purchase</p>
            <Link href="/allproducts">See products</Link>
          </div>
        </div>
        <div className="home__categories__header">
          <h1 className="home__title__categories">Latest products</h1>
          <Link href="/allproducts">
            All products <ArrowForwardIosIcon />
          </Link>
        </div>
        <div className="home__main">
          <Carousel />
        </div>
        <div className="home__categories__header">
          <h1 className="home__title__categories">Categories</h1>
          <Link href="/">
            All categories <ArrowForwardIosIcon />
          </Link>
        </div>
        <div className="home__categories">
          <CategoryRow />
        </div>
      </div>
    </section>
  );
}
