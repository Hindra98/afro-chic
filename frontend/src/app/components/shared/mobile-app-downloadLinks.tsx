import playstore from "../../assets/googleplay.png";
import appstore from "../../assets/appstore.png";
import ImageLink from "./image-link";
import { useTranslation } from "react-i18next";

interface Props {
  cssClassList: string;
}

const MobileAppDownloadlinks = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className={props.cssClassList}>
      <div className="playstore">
        <ImageLink
          to={"/playstore"}
          src={playstore}
          alt="Google Play Store"
          title={t(
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
          title={t(
            "MODULES_COMMON_Authentication_Download_Our_App_On_AppStore"
          )}
          className="w-36"
        />
      </div>
    </div>
  );
};

export default MobileAppDownloadlinks;
