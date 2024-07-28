import cardHeader from "./card-header";
import { useNavigate } from "react-router-dom";

type Props = { header: cardHeader | null };

const CardHeader = ({ header }: Props) => {
  const navigate = useNavigate();
  const returnPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      {header !== null && (
        <div className="flex flex-row items-center justify-between border-b-gray-300 border-b py-3 mt-2 mx-5">
          <div className="flex flex-row justify-start gap-4 items-center">
            {header?.getReturnPrevious() !== null && (
              <span className="icon left-openicon- cursor-pointer" onClick={header?.getReturnPrevious() === "" ? returnPreviousPage : header?.getReturnPrevious() as () => void}></span>
            )}
            {header?.getImageSource() !== "" && (<img className="h-5" alt="" src={header?.getImageSource()} />)}
            {header?.getTitle() !== "" && (<span className=""> {header?.getTitle()}</span>)}
          </div>
          {header?.getClosePage() !== null && (<span className="ico text-gray-700 cancelicon- cursor-pointer" onClick={header?.getClosePage()}></span>)}
        </div>
      )}
    </>
  );
};

export default CardHeader;
