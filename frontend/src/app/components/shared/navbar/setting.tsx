import { useTranslation } from "react-i18next";

const SettingNavbar = () => {
  const route: string = "/app-settings";
  const { t } = useTranslation();

  function handleGoToSettings() {
    window.location.href = route;
  }

  return (
      <span
        className={"e-icons cog-5icon- text-xl font-medium text-black p-0 m-0 cursor-pointer mx-2"}
        title={t("MODULE_COMMON_NAVBAR_SETTINGS")}
        onClick={handleGoToSettings}
      ></span>
  );
};

export default SettingNavbar;
