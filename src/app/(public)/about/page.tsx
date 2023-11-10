import { Metadata } from "next";

import Link from "next/link";
import about from "@/assets/about-main.jpg";

import "./style.scss";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vodiy perfume | About",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const AboutPage = () => {
  return (
    <section className="about">
      <div className="container about__container">
        <div className="about__main">
          <div className="about__img">
            <Image src={about} alt="about" fill objectFit="cover" />
          </div>
          <div className="about__desc">
            <h2>About Our Company</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima dicta magni aperiam, doloribus tenetur illum, officia debitis vero at dolorum sint labore? Vel sit quos cum voluptas vero qui vitae sunt numquam sed. Eveniet necessitatibus amet repudiandae sapiente voluptates, laboriosam quis dignissimos quaerat dolore tenetur, natus eius nostrum pariatur consequuntur et at. Quo ipsa, ipsum vitae ipsam veritatis ratione. Vero consectetur laudantium ab consequuntur at ipsum quod atque aperiam nobis accusantium aliquid nostrum dignissimos fugiat animi iste, iure deleniti fugit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
