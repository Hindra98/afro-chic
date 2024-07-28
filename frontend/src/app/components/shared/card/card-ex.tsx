import { Link } from "react-router-dom";

type Props = {
  name: string;
  size: string;
  price: number;
  note: string;
  id: string;
  img?: string;
  online?: boolean;
};

const Card = (props: Props) => {
  return (
    <div className={`border p-1 min-w-[250px] w-full ${props.online ? "" : " max-w-[350px]"}`}>
      <Link to={"product/" + props.id} className={`group block overflow-hidden ${props.online && "flex flex-row justify-between items-stretch"}`}>
        <div className={`relative object-cover sm:h-[450px] overflow-hidden ${props.online ? "h-[150px] w-96" : "h-[350px] w-full"}`}>
          <img
            src={props.img}
            alt=""
            className={`"w-full object-cover group-hover:scale-125 transition  ${props.online ? "h-[150px] w-96" : "h-[350px] sm:h-[450px]"}`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-35 transition"></div>
        </div>


        <div className={`mt-3 flex justify-between text-sm z-10 ${props.online && "flex-col justify-between"}`}>
          <div>
            <h3 className="text-gray-900 group-hover:underline group-hover:font-bold group-hover:underline-offset-4">
              {props.name}
            </h3>

            <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {props?.size && `Taille:  ${props.size}`} <br />
              Note: {props.note}
            </p>
          </div>
          <p className="text-gray-900">&euro;{props.price}</p>
          {props?.online && <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-35 transition"></div>}
        </div>
      </Link>
    </div>
  );
};

export default Card;
