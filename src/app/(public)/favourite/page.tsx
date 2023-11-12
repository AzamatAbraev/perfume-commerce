import { Metadata } from "next";
import FavouriteCard from "@/components/card/FavouriteCard";

import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy perfume | Favourite",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const FavouritePage = () => {
  
  return <section>
    <div className="container">
      <FavouriteCard/>
    </div>
  </section>;
};

export default FavouritePage;
