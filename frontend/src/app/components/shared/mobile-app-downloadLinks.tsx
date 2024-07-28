import playstore from "../../assets/googleplay.png";
import appstore from "../../assets/appstore.png";
import ImageLink from "./image-link";
import { useLocalizer } from "../../core/Localization";

interface Props {
  cssClassList: string;
}

const MobileAppDownloadlinks = (props: Props) => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  return (
    <div className={props.cssClassList}>
      <div className="playstore">
        <ImageLink
          to={"/playstore"}
          src={playstore}
          alt="Google Play Store"
          title={commonLocalizer(
            "MODULES_COMMON_Authentication_Download_Our_App_On_PlayStore"
          )}
          className="w-36"
        />
      </div>
      <div className="appstore">
        <ImageLink
          to={"/appstore"}
          src={appstore}
          alt="App Store"
          title={commonLocalizer(
            "MODULES_COMMON_Authentication_Download_Our_App_On_AppStore"
          )}
          className="w-36"
        />
      </div>
    </div>
  );
};

export default MobileAppDownloadlinks;
