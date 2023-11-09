import DynamicMetaData from "@/types/metaData";
import React from "react";

export function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { productId } = params;
  return {
    title: productId,
    description: productId,
  };
}

const CategoryPage = () => {
  return <div>CategoryPage</div>;
};

export default CategoryPage;
