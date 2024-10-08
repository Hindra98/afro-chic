import { banner, coco3, coco5, ensemble, pull, vetement } from "../../../../assets/images";
import { Link } from "react-router-dom";
import Slider from 'react-slick';

import {
  DeliveryVanIcon,
  MoneyBackIcon,
  ServiceHoursIcon,
} from "../../../../assets/icones";
import { useTranslation } from "react-i18next";

type Slide = {
  Subtext?: string;
  imgSrc?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  num?: number;
};

const CustomSlide = ({
  Subtext,
  imgSrc,
  text,
  buttonText,
  buttonLink,
}: Slide) => (
  <section
    className={`relative custom-slide w-full h-[550px]`}
    style={{ background: `url(${imgSrc}) no-repeat center center`, backgroundSize: `cover` }}
  >
    <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

    <div className="relative mx-auto max-w-screen-xl px-14 py-32 sm:px-14 lg:flex lg:items-center lg:px-12">
      <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
          {text}
        </h1>

        <p className="hidden max-w-lg text-white/90 xs:mt-6 xs:block xs:text-lg xs:leading-relaxed">
          {Subtext}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 text-center">
          <Link
            to={buttonLink as string}
            className="block w-full rounded bg-white px-12 py-3 focus:outline-none focus:ring sm:w-auto p-2 text-xl hover:bg-black hover:text-white duration-200 font-bold"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} me-12`}
      onClick={onClick}
    />
  );
}

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ms-12`}
      onClick={onClick}
    />
  );
}


const Banner = () => {
  const { t } = useTranslation();
  const slides = [
    {
      imgSrc: pull,
      text: "Pas d'inspi",
      Subtext:
        "Avec les costumes de AfroChic, lorem ipsum dolor sit amet et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
    {
      imgSrc: coco3,
      text: "Restez droit dans vos bottes",
      Subtext:
        "Avec les bottes de AfroChic, lorem ipsum dolor sit amet et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap",
      buttonLink: "/offer",
      buttonText: "Voir",
    },
    {
      imgSrc: banner,
      text: "Nos nouveaux manteaux contre le froid",
      Subtext:
        "Avec les manteaux de AfroChic, lorem ipsum dolor sit amet et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap",
      buttonLink: "/shop",
      buttonText: "About-us",
    },
    {
      imgSrc: vetement,
      text: "Epuiseeeeeeeeeee",
      Subtext:
        "Avec les costumes de AfroChic, lorem ipsum dolor sit amet et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
    {
      imgSrc: coco5,
      text: "Noblesse, Dignite, elegance",
      Subtext:
        "Avec les costumes de AfroChic, lorem ipsum dolor sit amet et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
    {
      imgSrc: ensemble,
      text: "Epuiseeeeeeeeeee",
      Subtext:
        "Avec les costumes de AfroChic, lorem ipsum dolor sit amet et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap et sap",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className=" w-full">
      <div className="w-full bg-transparent">
      <Slider {...settings}>
        {slides.map(slide=><CustomSlide {...slide}/>)}
    </Slider>
      </div>

      <div className="container py-16 mx-auto">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <DeliveryVanIcon
              className="w-12 h-12 object-contain"
              aria-hidden="true"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">{t("MODULE_COMMON_BANNER_FREE_SHIPPING")}</h4>
              <p className="text-gray-500 text-sm">{t("MODULE_COMMON_BANNER_ORDER")}</p>
            </div>
          </div>
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <MoneyBackIcon
              className="w-12 h-12 object-contain"
              aria-hidden="true"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">{t("MODULE_COMMON_BANNER_MONEY_RETURNS")}</h4>
              <p className="text-gray-500 text-sm">{t("MODULE_COMMON_BANNER_THIRTY_DAY")}</p>
            </div>
          </div>
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <ServiceHoursIcon
              className="w-12 h-12 object-contain"
              aria-hidden="true"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">{t("MODULE_COMMON_BANNER_SUPPORT")}</h4>
              <p className="text-gray-500 text-sm">{t("MODULE_COMMON_BANNER_CUSTOMER_SUPPORT")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
