interface ProductType {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: {
    url: string;
  };
  quantity: number;
  category: {
    name: string,
  };
  createdAt: string;
  updatedAt: string;
}

export default ProductType;