interface Product {
  id?: string;
  note?: string;
  name: string;
  size?: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  created_at?: string;
  category?: string;
  house?: string;
  stock?: string;
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
