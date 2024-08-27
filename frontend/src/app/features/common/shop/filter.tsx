// import { useState } from "react";

import { useTranslation } from "react-i18next";
import Button from "../../../components/form/Button";
import "../../../styles/components/_filter.scss";
import { useState } from "react";

const Filter = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  // const [itemsPerPage, setItemsPerPage] = useState(48);
  // const itemsPerPageFromBanner = (itemsPerPage) => {
  //   setItemsPerPage(itemsPerPage);
  // };

  return (
    <div
      className={` ${
        open ? "w-72" : "w-10 "
      } bg-fourth h-screen pt-8  duration-300 fixed`}
    >
      <div className={`absolute cursor-pointer size-8 -right-[16px] top-9 border-4 border-secondary bg-white rounded-full`} onClick={() => setOpen(!open)}>
        <span
          onClick={() => setOpen(!open)}
          className={`icon block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[20px] text-secondary ${open ? "left-diricon-" : "right-diricon-"}`}
        ></span>
      </div>

      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={` origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Afrochic
        </h1>
      </div>

      <form
        className={`divide-y divide-gray-200 space-y-5 pt-6 px-4 pb-2 ${open ? "block" : "hidden"} transition`}
      >
        <div>
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
            Categories
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-1"
                id="cat-1"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-1"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Pour hommes
              </label>
              <div className="ml-auto text-gray-600 text-sm">(15)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-2"
                id="cat-2"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-2"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Pour femmes
              </label>
              <div className="ml-auto text-gray-600 text-sm">(9)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-3"
                id="cat-3"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-3"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Pour enfants
              </label>
              <div className="ml-auto text-gray-600 text-sm">(21)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-4"
                id="cat-4"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-4"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Accessoires
              </label>
              <div className="ml-auto text-gray-600 text-sm">(42)</div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
            Marques et maisons
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="brand-1"
                id="brand-1"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="brand-1"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                SM
              </label>
              <div className="ml-auto text-gray-600 text-sm">(15)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="brand-2"
                id="brand-2"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="brand-2"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Maison H
              </label>
              <div className="ml-auto text-gray-600 text-sm">(9)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="brand-3"
                id="brand-3"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="brand-3"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Ashley Fashion
              </label>
              <div className="ml-auto text-gray-600 text-sm">(21)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="brand-4"
                id="brand-4"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="brand-4"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                M&D Shopping
              </label>
              <div className="ml-auto text-gray-600 text-sm">(10)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="brand-5"
                id="brand-5"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="brand-5"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                My Shop
              </label>
              <div className="ml-auto text-gray-600 text-sm">(10)</div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
            Prix
          </h3>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              name="min"
              id="min"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="min"
            />
            <span className="mx-3 text-gray-500">-</span>
            <input
              type="text"
              name="max"
              id="max"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="max"
            />
          </div>
        </div>
        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">
            Taille
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="size-selector">
              <input type="radio" name="size" id="size-xs" className="hidden" />
              <label
                htmlFor="size-xs"
                className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                XS
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-sm" className="hidden" />
              <label
                htmlFor="size-sm"
                className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                S
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-m" className="hidden" />
              <label
                htmlFor="size-m"
                className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                M
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-l" className="hidden" />
              <label
                htmlFor="size-l"
                className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                L
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-xl" className="hidden" />
              <label
                htmlFor="size-xl"
                className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                XL
              </label>
            </div>
            <div className="size-selector">
              <input
                type="radio"
                name="size"
                id="size-xxl"
                className="hidden"
              />
              <label
                htmlFor="size-xxl"
                className="select-none text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                XXL
              </label>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <Button param={{ type: "submit", name: "Valider" }} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
