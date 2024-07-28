import Card from "../home/components/card";
import { banner, ensemble, pull, vetement } from "../../../assets/images";
import "../../../styles/components/_filter.scss";
import { useState } from "react";
import Button from "../../../components/form/Button";

const Product = () => {
  const [quantity, setQuantity] = useState(0)
  return (
    <div className="flex flex-col gap-4 w-full py-2 px-24">
      <div className="product-details flex justify-start gap-5 xxs:flex-col xmd:flex-row">
        <div className="img xmd:w-1/2">
          <img src={banner} alt="Produit" className="w-full max-h-[500px]" />
        </div>
        <div className="detail flex flex-col items-start justify-between gap-1 xmd:w-1/2">
          <h1 className="font-bold text-4xl pb-2">Nom du produit</h1>
          <p className="note">
            Note du produit <small>500pers</small>
          </p>
          <p className="font-bold">
            Categorie: <span className="font-normal">Tenue traditionnelle</span>
          </p>
          <p className="font-bold">
            Maison: <span className="font-normal">My Shop</span>
          </p>
          <p className="font-bold">
            Statut: <span className="text-lime-700 font-medium">En stock</span>
          </p>
          <p className="font-bold text-3xl text-red-700">&euro;200</p>
          <p className="font-normal text-pretty line-clamp-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            necessitatibus similique aliquam, omnis, magni facilis maxime,
            veniam voluptatem eum eveniet harum non ducimus temporibus fuga eius
            quaerat soluta explicabo eaque.Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Laudantium necessitatibus similique
            aliquam, omnis, magni facilis maxime, veniam voluptatem eum eveniet
            harum non ducimus temporibus fuga eius quaerat soluta explicabo
            eaque.
          </p>
          <p className="font-normal flex flex-col gap-2">
            <h2>Taille</h2>
            <div className="flex items-center justify-start gap-2">
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xs"
                  className="hidden"
                />
                <label
                  htmlFor="size-xs"
                  className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XS
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-sm"
                  className="hidden"
                />
                <label
                  htmlFor="size-sm"
                  className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  S
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-m"
                  className="hidden"
                />
                <label
                  htmlFor="size-m"
                  className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  M
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-l"
                  className="hidden"
                />
                <label
                  htmlFor="size-l"
                  className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  L
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xl"
                  className="hidden"
                />
                <label
                  htmlFor="size-xl"
                  className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XL
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xxl"
                  className="hidden"
                />
                <label
                  htmlFor="size-xxl"
                  className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XXL
                </label>
              </div>
            </div>
          </p>
          <p className="font-normal flex flex-col gap-2">
            <h2>Quantité</h2>
            <div className="flex flex-row items-center divide-x border w-fit">
              <span onClick={()=>setQuantity(prev=>(quantity>0?prev-1:0))} className="icon minus-2icon- cursor-pointer size-8 text-center pt-1 hover:bg-primary active:bg-secondary transition"></span>
              <span className="size-8 text-center pt-1">{quantity}</span>
              <span onClick={()=>setQuantity(prev=>prev+1)} className="icon plus-2icon- cursor-pointer size-8 text-center pt-1 hover:bg-primary active:bg-secondary transition"></span>
            </div>
          </p>
          <p className="flex flex-row items-center justify-start gap-4 me-auto pt-4">
            <Button param={{type: 'button', name: "Ajouter au panier", css: "p-2"}} />
          </p>
        </div>
      </div>
      <div className="details flex flex-col gap-3 xxs:w-full xmd:w-1/2">
        <h2 className="font-bold">Details du produit</h2>
        <hr className="" />
        <p className="text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus labore maxime, quibusdam tempora ratione ullam nobis minus ducimus, placeat reiciendis, magnam cum blanditiis possimus! Nostrum dolor vitae deleniti blanditiis adipisci.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus labore maxime, quibusdam tempora ratione ullam nobis minus ducimus, placeat reiciendis, magnam cum blanditiis possimus! Nostrum dolor vitae deleniti blanditiis adipisci.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus labore maxime, quibusdam tempora ratione ullam nobis minus ducimus, placeat reiciendis, magnam cum blanditiis possimus! Nostrum dolor vitae deleniti blanditiis adipisci.
        </p>
      </div>

      <div className="more-products flex flex-col items-start gap-2 w-full">
        <h2 className="font-medium text-xl see-more">Voir aussi</h2>
        <div className={`flex gap-4 flex-row justify-between mb-2`}>
          <Card
            id={"4"}
            name="Ecouteurs"
            price={102}
            size={"S"}
            note="4/5"
            image={banner}
          />
          <Card
            id={"5"}
            name="Pull Over"
            price={41}
            size={"L"}
            note="4/5"
            image={pull}
          />
          <Card
            id={"6"}
            name="Ensemble"
            price={72}
            size={"XXL"}
            note="4/5"
            image={ensemble}
          />
          <Card
            id={"7"}
            name="Vetements"
            price={35}
            size={"M"}
            note="4/5"
            image={vetement}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
