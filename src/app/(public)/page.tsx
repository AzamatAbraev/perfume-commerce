import Carousel from "@/components/slider/Slider";
import Link from "next/link";

import CategoryRow from "@/components/card/CategoryCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "@/general-styles/public-home.scss";

export default function Home() {
  return (
    <section className="home">
      <div className="container">
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
