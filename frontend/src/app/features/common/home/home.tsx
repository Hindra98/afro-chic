
import "../../../styles/_home.scss";
import Banner from "./components/banner";
import Card from "./components/card";
import { banner, ensemble, pull, vetement } from "../../../assets/images";
import Category from "./components/category";
import { useTranslation } from "react-i18next";

const Home = () => {

  const { t } = useTranslation();

  const categories = [
    { name: "Ensemble", id: "ensemble", img: ensemble, link: "ensemble" },
    { name: "Vetement", id: "vetement", img: vetement, link: "vetement" },
    { name: "Pull Over", id: "pull", img: pull, link: "pull" },
  ];

  window.document.title = t("MODULE_COMMON_SIDEBAR_DASHBOARD");

  return (
    <div className="h-full flex flex-col justify-start mx-auto home">

      <Banner />

      <div className="container py-16 mx-auto">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Trier par categorie</h2>
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
          {categories.map((category, index) => (<Category {...category} key={index} />))}
        </div>
      </div>

      <div className="flex flex-row justify-center flex-wrap gap-4 m-2">
        <Card id={'0'} name="Pull over" price={41} size={'S'} note="4/5" imageUrl={pull} />
        <Card id={'1'} name="Vetements" price={20} size={'L'} note="4/5" imageUrl={vetement} />
        <Card id={'2'} name="Ecouteurs" price={41} size={'XS'} note="4/5" imageUrl={banner} />
        <Card id={'3'} name="Ensemble" price={59} size={'XL'} note="4/5" imageUrl={ensemble} />
        <Card id={'4'} name="Ecouteurs" price={102} size={'S'} note="4/5" imageUrl={banner} />
        <Card id={'5'} name="Pull Over" price={41} size={'L'} note="4/5" imageUrl={pull} />
        <Card id={'6'} name="Ensemble" price={72} size={'XXL'} note="4/5" imageUrl={ensemble} />
        <Card id={'7'} name="Vetements" price={35} size={'M'} note="4/5" imageUrl={vetement} />
      </div>


    </div>
  );
};

export default Home;
