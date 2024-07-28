import { Link } from "react-router-dom";
import { useLocalizer } from "../../core/Localization";
import "../../styles/_page-not-found.scss"

export function PageNotFound() {

    const commonLocalizer = useLocalizer("Common-ResCommon");

    return (
        <div className="form-base flex flex-col justify-center w-full">
            <div className="flex flex-col gap-6 justify-center min-h-[490px]">
            <div className="flex justify-center items-center">
                <div className="center-items">
                    <h1 className="oups">{commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_OUPS")}</h1>
                    <h1 className="page-not-found">{commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_TITLE")}</h1>
                    <div className="go-back">
                      <Link to=".." relative="path" >{commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_BACK_TO_HOME")}</Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
      );
  }