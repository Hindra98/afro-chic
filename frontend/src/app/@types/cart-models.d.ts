
interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface FavItem {
  id: string;
  name: string;
}

interface Cart {
  idUser : string;
  cart : CartItem[];
}