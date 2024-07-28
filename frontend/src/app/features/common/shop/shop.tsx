// import { useState } from "react";
import { useRef, useState } from "react";
import { banner, ensemble, pull, vetement } from "../../../assets/images";
import { useLocalizer } from "../../../core/Localization";
import Card from "../home/components/card";
import Filter from "./filter";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

const Shop = () => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const [isShowBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [listView, setListView] = useState<boolean>(false);
  const sidebarInstance = useRef<SidebarComponent>(null);

  let smallScreen: boolean = false;
  if (window.innerWidth < 1000) smallScreen = true;

  const initialData = () => {};

  const sidebarToggle = () => {
    if (isShowBackdrop) {
      (sidebarInstance.current as SidebarComponent).hide();
      setShowBackdrop(false);
    } else {
      (sidebarInstance.current as SidebarComponent).toggle();
      setShowBackdrop(smallScreen);
    }
  };

  return (
    <div className="flex flex-col mx-auto px-4 relative">
      <div className="title text-3xl my-4 mx-4 font-bold relative">
        <h1 className="" onClick={sidebarToggle}>
          Nos produits
        </h1>
      </div>
      <div className="flex flex-row gap-4 relative">
        <SidebarComponent
          ref={sidebarInstance}
          closeOnDocumentClick={smallScreen}
          showBackdrop={isShowBackdrop}
          width="270px"
          target="#home-core-layout"
          id="filterSidebar"
          className="filter-sidebar w-fit bg-white fixed left-10 top-10 mt-10"
          type={smallScreen ? "Over" : "Push"}
          enableGestures={smallScreen}
          position={"Left"}
          open={() => initialData()}
        >
          <div className="flex flex-col justify-start items-center h-full py-7 relative">
            <Filter />
          </div>
        </SidebarComponent>

        <div className="product flex flex-col gap-4 items-stretch justify-start w-full">
          <div className="flex items-center justify-between">
            <select
              name="sort"
              id="sort"
              className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="">Tri par défaut</option>
              <option value="price-low-to-high">
                Prix (Plus petit au plus grand)
              </option>
              <option value="price-high-to-low">
                Prix (Plus grand au plus petit)
              </option>
              <option value="latest">Meilleures ventes</option>
            </select>

            <div className="flex items-center gap-2 ms-auto">
              <div className="size-selector">
                <input
                  type="radio"
                  name="list-view"
                  id="list-horizontal"
                  checked={!listView}
                  onChange={()=>setListView(false)}
                  className="hidden"
                />
                <label
                  htmlFor="list-horizontal"
                  className="select-none border border-gray-200 w-10 h-9 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 rounded"
                >
                  <span className="icon th-1icon-"></span>
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="list-view"
                  id="list-vertical"
                  checked={listView}
                  onChange={()=>setListView(true)}
                  className="hidden"
                />
                <label
                  htmlFor="list-vertical"
                  className="select-none border border-gray-200 w-10 h-9 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 rounded"
                >
                  <span className="icon th-list-1icon-"></span>
                </label>
              </div>
            </div>
          </div>

          <div className={`flex gap-4 m-2 ${listView ? "flex-col w-full":"flex-row justify-center flex-wrap"}`}>
            <Card
            online={listView}
              id={"0"}
              name="Pull over"
              price={41}
              size={"S"}
              note="4/5"
              image={pull}
            />
            <Card
            online={listView}
              id={"1"}
              name="Vetements"
              price={20}
              size={"L"}
              note="4/5"
              image={vetement}
            />
            <Card
            online={listView}
              id={"2"}
              name="Ecouteurs"
              price={41}
              size={"XS"}
              note="4/5"
              image={banner}
            />
            <Card
            online={listView}
              id={"3"}
              name="Ensemble"
              price={59}
              size={"XL"}
              note="4/5"
              image={ensemble}
            />
            <Card
            online={listView}
              id={"4"}
              name="Ecouteurs"
              price={102}
              size={"S"}
              note="4/5"
              image={banner}
            />
            <Card
            online={listView}
              id={"5"}
              name="PullOver"
              price={41}
              size={"L"}
              note="4/5"
              image={pull}
            />
            <Card
            online={listView}
              id={"6"}
              name="Ensemble"
              price={72}
              size={"XXL"}
              note="4/5"
              image={ensemble}
            />
            <Card
            online={listView}
              id={"7"}
              name="Vetements"
              price={35}
              size={"M"}
              note="4/5"
              image={vetement}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
