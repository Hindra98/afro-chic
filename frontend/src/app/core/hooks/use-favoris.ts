import { useEffect, useState } from "react";
import { getStorage, setStorage } from "../storage/storage";
import { CardConstant } from "../constants/common-constants";
import { toast } from 'react-toastify';

const useFavoris = () => {
  const [wishList, setWishList] = useState<FavItem[]>([]);

  // useEffect(() => {
  //   const storedFav = JSON.parse(getStorage<string>(CardConstant.FAVORIS));
  //   console.log("storedFav", storedFav);
  //   // Object.keys(storedFav).map(key => setWishList(storedFav[key]))
  // }, []);

  useEffect(() => {
    setStorage(CardConstant.FAVORIS, JSON.stringify(wishList));
  }, [wishList]);

  const toggleItem = (item: Product) => {
    setWishList((prevFav) => {
      const oldItem = prevFav.find((cartItem) => cartItem.id === item.id);
      if (oldItem) return prevFav.filter((item) => item.id !== oldItem.id)
      return [...prevFav, item]
    })
    const neckFav = wishList;
    if(neckFav.find((favItem) => favItem.id === item.id)) {
      neckFav.filter((old) => old.id !== item.id)
    } else {
      neckFav.push({id: item.id, name: item.name});
    }
    setWishList(neckFav)
  };

  const emptyFav = () => {
    setWishList([]);
    toast("Vous avez nettoyé votre liste de souhaits avec succèss!");
  };

  return { wishList, emptyFav, toggleItem };
};

export default useFavoris;
