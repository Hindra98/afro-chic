import appStore from "../../../../assets/appstore.png";
import banner from "../../../../assets/images/banner/banner-auth.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HelpText = () => {
  const { t } = useTranslation();
  return (
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src={banner}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <Link to={"/"} className="block text-white">
          <span className="sr-only">Home</span>
          <img alt="App Store Logo" className="h-8 sm:h-10" src={appStore} />
        </Link>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {t("MODULE_COMMON_AUTHENTICATION_SCREEN_LOGIN_TITLE")}
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          {t(
            "MODULE_COMMON_AUTHENTICATION_SCREEN_LOGIN_HELP_TEXT"
          )}{" "}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>
  );
};

export default HelpText;
