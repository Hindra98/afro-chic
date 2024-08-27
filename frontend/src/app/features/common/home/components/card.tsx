import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/form/Button";
import useCart from "../../../../core/hooks/use-cart";
import useFavoris from "../../../../core/hooks/use-favoris";

interface Card extends Product {
  online?: boolean;
}

const Card = (props: Card) => {
  const [favoris, setFavoris] = useState(false);
  const { addItem, cartItems } = useCart();
  const { toggleItem } = useFavoris();
  
  return (
    <div
      className={`border p-1 min-w-[250px] w-full overflow-clip ${props?.online ? "h-[158px]" : " max-w-[350px]"}`}
    >
      <div
        className={`group overflow-hidden ${props?.online && "flex flex-row justify-start items-stretch gap-16"}`}
      >
        <Link
          to={"/product/" + props.id}
          className={`relative block object-cover overflow-hidden ${props?.online ? "h-[150px] w-[384px]" : "h-[350px] sm:h-[450px] w-full"}`}
        >
          <img
            src={props.imageUrl}
            alt=""
            className={`w-full object-cover group-hover:scale-125 transition h-full`}
          />
          {!props?.online && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-35 transition"></div>
          )}
        </Link>

        <div
          className={` flex justify-between text-sm z-10 ${props?.online && "flex-col justify-between w-40"}`}
        >
          <Link to={"product/" + props.id} className="block">
            <h3
              className={`text-gray-900 w-full group-hover:underline group-hover:font-bold group-hover:underline-offset-4 ${props?.online && "font-bold text-2xl"}`}
            >
              {props.name} {cartItems.length}
            </h3>

            <p
              className={`mt-1.5 text-pretty text-gray-500 ${props?.online ? "font-medium text-lg" : "text-xs"}`}
            >
              {props?.size && `Taille:  ${props.size}`} <br />
              Note: {props.note}
            </p>
          </Link>

          <p
            className={`text-gray-900 flex flex-col gap-2 justify-between relative ${props?.online && "font-medium text-lg mt-auto"}`}
          >
            <span>&euro;{props.price}</span>
            {!props.online && (
              <span
                className={`icon text-primary text-xl cursor-pointer ${favoris ? "heart-filledicon-" : "heart-2icon-"}`}
                onClick={() => (setFavoris(!favoris), toggleItem({ id: props.id, name: props.name }))}
              ></span>
            )}
          </p>
        </div>
        {!props.online && (
          <Button
            param={{
              type: "button",
              name: "Ajouter au panier",
              css: "w-full",
              handleClick: () =>
                addItem({ id: props.id, name: props.name }),
            }}
          />
        )}
        {props.online && (
          <div className="italic text-sm w-1/2 px-5 ms-auto py-3 overflow-clip text-ellipsis self-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            et hic iusto, placeat earum dolore ipsum expedita, vel doloremque
            rerum aliquam libero sit ipsa adipisci suscipit aut porro eius.
            Perspiciatis? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Provident et hic iusto, placeat earum dolore ipsum expedita,
            vel doloremque rerum aliquam libero sit ipsa adipisci suscipit aut
            porro eius. Perspiciatis? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Provident et hic iusto, placeat earum dolore ipsum
            expedita, vel doloremque rerum aliquam libero sit ipsa adipisci
            suscipit aut porro eius. Perspiciatis? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Provident et hic iusto, placeat earum
            dolore ipsum expedita, vel doloremque rerum aliquam libero sit ipsa
            adipisci suscipit aut porro eius. Perspiciatis?
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
