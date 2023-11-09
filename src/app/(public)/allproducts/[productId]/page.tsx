import DynamicMetaData from "@/types/metaData";
import React from "react";

export function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { productId } = params;
  return {
    title: productId,
    description: productId,
  };
}

const ProductPage = () => {
  return <div>ProductPage</div>;
};

export default ProductPage;
