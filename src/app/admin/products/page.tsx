import ProductsTable from "@/components/products/ProductsTable"

const ProductsPage = () => {
  return <div style={{ paddingBottom: "50px" }}>
    <div className="users__row">
      <div className="users__card">
        <ProductsTable />
      </div>
    </div>
  </div>;
};

export default ProductsPage;
