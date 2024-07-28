
interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface Cart {
  idUser : string;
  cart : CartItem[];
}