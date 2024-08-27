import { useState } from "react";
import "../../../styles/_search-input.scss";
import { useTranslation } from "react-i18next";

const SearchBox = () => {
  const { t } = useTranslation();

  const [headerViewModel, setHeaderViewModel] = useState({
    search: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setHeaderViewModel({
      ...headerViewModel,
      [name]: value,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(headerViewModel.search);
  };

  return (
    <div className="mx-auto text-md xmd:w-1/3 md:w-1/4 xxs:w-0 flex flex-row gap-0 items-center justify-between ps-1 pe-2 rounded-full search">
      <input
        type="search"
        id="search"
        name="search"
        placeholder={t("MODULE_COMMON_NAVBAR_SEARCH")}
        className="search-input w-full outline-none border-none"
        value={headerViewModel.search}
        autoComplete="off"
        onChange={handleChange}
      />
      <span
        className={"e-icons e-search text-2xl font-extrabold cursor-pointer"}
        onClick={handleSearch}
      ></span>
    </div>
  );
};

export default SearchBox;
