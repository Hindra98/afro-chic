import { Link } from "react-router-dom";
import Button from "../../form/Button";
import cardFooter from "./card-footer";

type Props = { footer: cardFooter | null };

const CardFooter = ({ footer }: Props) => {
  return (
    <>
      {footer !== null && (
        <div className="flex flex-col items-center card-footer justify-between pb-5 pt-2 px-5 gap-3">
          {footer?.getTexte() && <p className=""> {footer?.getTexte()}</p>}
          {footer?.getButtons()?.length > 0 && (
            <div className={`flex gap-2 w-full ${footer?.getButtons()?.length < 2 ? " " : " justify-end "}`}>
              {footer?.getButtons()?.map((button, key) => (
                <Button
                  key={key}
                  param={{...button, css: button.css + (footer?.getButtons()?.length < 2 ? " w-full tracking-wide " : " tracking-wide ")}}
                />
              ))}
            </div>
          )}
          {footer?.getLink() !== null && (
            <Link to={footer?.getLink()?.href} target={footer?.getLink()?.target} className={`underline ${footer?.getLink()?.css}`}>{footer?.getLink()?.name}</Link>
          )}
        </div>
      )}
    </>
  );
};

export default CardFooter;
