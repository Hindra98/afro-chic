import { Link } from "react-router-dom";

type Props = {
  name?: string;
  link?: string;
  id?: string;
  img?: string;
};

const Category = (props: Props) => {
  return (
    <div
      className="relative rounded-sm overflow-hidden group h-96"
      id={props?.id}
    >
      <img
        src={props?.img}
        alt={props?.name}
        className="w-full object-cover h-full group-hover:scale-150 transition"
      />
      <Link
        to={props?.link as string}
        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-medium group-hover:font-bold group-hover:bg-opacity-60 transition"
      >
        {props?.name}
      </Link>
    </div>
  );
};

export default Category;
