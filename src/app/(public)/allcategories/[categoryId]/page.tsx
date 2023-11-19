import DynamicMetaData from "@/types/metaData";
import OneCategoryRow from "@/components/card/OneCategoryRow";

export function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { categoryId } = params;
  return {
    title: categoryId,
    description: categoryId,
  };
}

const CategoryPage = () => {
  return <div style={{paddingBottom: "50px"}} className="container">
    <OneCategoryRow/>
  </div>;
};

export default CategoryPage;
