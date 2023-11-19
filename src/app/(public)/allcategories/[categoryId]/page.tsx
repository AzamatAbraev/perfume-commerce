import DynamicMetaData from "@/types/metaData";

import {request} from "@/server/request";
import OneCategoryRow from "@/components/card/OneCategoryRow";

export async function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { categoryId } = params;

  const {data} = await request.get(`category/${categoryId}`)

  return {
    title: data?.name,
    description: data?.name,
  };
}

const CategoryPage = () => {
  return <div style={{paddingBottom: "50px"}} className="container">
    <OneCategoryRow/>
  </div>;
};

export default CategoryPage;
