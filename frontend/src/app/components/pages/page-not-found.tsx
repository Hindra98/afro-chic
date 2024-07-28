import { Link } from "react-router-dom";
import { useLocalizer } from "../../core/Localization";
import "../../styles/_page-not-found.scss";

const PageNotFound = () => {
  const commonLocalizer = useLocalizer("Common-ResCommon");

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col gap-6 justify-center min-h-[93vh]">
        <div className="flex justify-center items-center">
          <div className="center-items text-center">
            <h1 className="oups font-extrabold">
              {commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_OUPS")}
            </h1>
            <h1 className="page-not-found font-bold text-3xl">
              {commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_TITLE")}
            </h1>
            <div className="go-back mt-5">
              <Link to=".." relative="path">
                {commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_BACK_TO_HOME")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;