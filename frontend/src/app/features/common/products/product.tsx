import Card from "../home/components/card";
import { banner, ensemble, pull, vetement } from "../../../assets/images";
import "../../../styles/components/_filter.scss";
import { useState } from "react";
import Button from "../../../components/form/Button";
import { useParams } from "react-router-dom";

const Product = () => {
  // const {idProduct} = useParams()
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="flex flex-col gap-4 w-full py-2 px-24">
      {/** New code */}
      <div className="md:flex md:items-center product-details">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={banner}
            alt="Produit - 1"
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">Nom du produit</h3>
          <span className="text-gray-500 mt-3">&euro;200</span>
          <hr className="my-3" />
          <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
              Quantité:
            </label>
            <div className="flex items-center mt-1 gap-2">
              <button
                className="text-gray-500 focus:outline-none focus:text-gray-600 max-w-5 w-5"
                onClick={() =>
                  setQuantity((prev) => (quantity > 0 ? prev - 1 : 0))
                }
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              <span className="text-gray-700 text-lg mx-2">{quantity}</span>
              <button
                className="text-gray-500 focus:outline-none focus:text-gray-600"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-gray-700 text-sm" htmlFor="count">
              Taille:
            </label>
            <div className="flex items-center mt-1 gap-4">
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
          </div>
          <div className="flex items-center mt-6 gap-2">
            <Button
              param={{ type: "button", name: "Passer à l'achat", css: "p-2 w-fit" }}
            />
            <Button
              param={{
                type: "button",
                name: (
                  <svg
                    className="h-5 w-5 mx-auto"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                ),
                css: "p-2 text-center",
              }}
            />
          </div>
        </div>
      </div>
      {/** New code */}

      <div className="details flex flex-col gap-3 xxs:w-full xmd:w-1/2">
        <h2 className="font-bold">Details du produit</h2>
        <hr className="" />
        <p className="text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus labore
          maxime, quibusdam tempora ratione ullam nobis minus ducimus, placeat
          reiciendis, magnam cum blanditiis possimus! Nostrum dolor vitae
          deleniti blanditiis adipisci. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Natus labore maxime, quibusdam tempora ratione ullam
          nobis minus ducimus, placeat reiciendis, magnam cum blanditiis
          possimus! Nostrum dolor vitae deleniti blanditiis adipisci. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Natus labore
          maxime, quibusdam tempora ratione ullam nobis minus ducimus, placeat
          reiciendis, magnam cum blanditiis possimus! Nostrum dolor vitae
          deleniti blanditiis adipisci.
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
            imageUrl={banner}
          />
          <Card
            id={"5"}
            name="Pull Over"
            price={41}
            size={"L"}
            note="4/5"
            imageUrl={pull}
          />
          <Card
            id={"6"}
            name="Ensemble"
            price={72}
            size={"XXL"}
            note="4/5"
            imageUrl={ensemble}
          />
          <Card
            id={"7"}
            name="Vetements"
            price={35}
            size={"M"}
            note="4/5"
            imageUrl={vetement}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
