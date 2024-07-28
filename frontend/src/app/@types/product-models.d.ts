interface Product {
  name: string;
  size: string;
  price: number;
  note: string;
  id: string;
  image?: string;
  description?: string;
}

interface AllProducts {
  productList: Product[];
}

interface selectedProductPayloadAction {
  type: string;
  payload: Product;
}

interface getProductsAction {
  type: string;
  payload: Product[];
}
