import { useEffect, useState } from "react";
import { getStorage, setStorage } from "../storage/storage";
import { CardConstant } from "../constants/common-constants";

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = getStorage<string>(CardConstant.CART);
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(newTotal);
    setStorage(CardConstant.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    const oldItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (oldItem) oldItem.quantity += item.quantity;
    else setCartItems([...cartItems, item]);
  };
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const emptyCart = () => {
    setCartItems([]);
  };

  return { cartItems, total, emptyCart, addItem, removeItem };
};

export default useCart;
