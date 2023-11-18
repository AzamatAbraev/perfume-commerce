import { request } from "@/server/request";
import DynamicMetaData from "@/types/metaData";
import { useRouter } from "next/navigation";

import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import AddButton from '../../../../components/button/AddButton';

export async function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { productId } = params;
  const {data} = await request.get(`product/${productId}`)
  return {
    title: data.title,
    description: data.description,
  };
}

const ProductPage = async ({
  params,
}: {
  params: { productId: string }
}) => {
  const {productId} = params;
  const {data: product} = await request.get(`product/${productId}`)
  const {data: category} = await request.get(`category/${product.category}`)

  return <section className="oneproduct">
    <div className="oneproduct__main container">
      <h1 className="product__title">{product.title}</h1>
      <div className="product__row">
        <div className="oneproduct__product__img">
          <Image src={product.image.url} alt={product.title} fill />
        </div>
        <div className="product__content">
          <h2>{product.title}</h2>
          <Link href={`/allcategories/${category._id}`}>{category.name}</Link>
          <p>{product.description}</p>
          <p>Price: <span>{product.price}</span></p>
          <p>Sold: <span>{product.sold}</span></p>
          <p>Stock: <span>{product.quantity}</span></p>
          <AddButton {...product}/>
        </div>
      </div>
    </div>
  </section>;
};

export default ProductPage;
