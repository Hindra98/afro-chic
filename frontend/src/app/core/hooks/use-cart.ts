import { useEffect, useState } from "react";
import { getStorage, setStorage } from "../storage/storage";
import { CardConstant } from "../constants/common-constants";
import { toast } from "react-toastify";

// getting the values of local storage
const getDatafromLS = () => {
  const data = getStorage<string>(CardConstant.CART);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const useCart = () => {
  const [cartItems, setCartItems] = useState(getDatafromLS());

  useEffect(() => {
    setStorage(CardConstant.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: Product) => {
    setCartItems((prevCart) => {
      const oldItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (oldItem)
        return prevCart.map((cardItem) =>
          cardItem.id === item.id
            ? { ...cardItem, quantity: cardItem.quantity + 1 }
            : cardItem
        );
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast(item.name + " ajouté au panier avec succèss!");
  };

  const removeItem = (id: string) => {
    setCartItems((prevCart) => {
      const oldItem = prevCart.find((cartItem) => cartItem.id === id);
      if (oldItem && oldItem.quantity > 1)
        return prevCart.map((cardItem) =>
          cardItem.id === id
            ? { ...cardItem, quantity: cardItem.quantity - 1 }
            : cardItem
        );
      return prevCart.filter((item) => item.id !== id);
    });
    toast("Article retiré du panier avec succèss!");
  };
  const emptyCart = () => {
    setCartItems([]);
    toast("Vous avez vidé le panier avec succèss!");
  };

  return { cartItems, emptyCart, addItem, removeItem };
};

export default useCart;
