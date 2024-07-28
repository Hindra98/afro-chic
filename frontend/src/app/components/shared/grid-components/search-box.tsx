import { useState } from "react";
import "../../../styles/_search-input.scss";

const SearchBox = (props: GridSearch) => {

  const [searchViewModel, setSearchViewModel] = useState({
    search: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchViewModel({
      ...searchViewModel,
      [name]: value,
    });
  };
  
  return (
    <div className={`mx-auto text-md flex flex-row gap-0 items-center w-auto justify-between ps-1 pe-2 my-2 rounded-full search ${props.css}`}>
      <input
        type="search"
        id="search"
        name="search"
        placeholder={"Rechercher dans la grille de données"}
        className="search-input w-full outline-none border-none"
        value={searchViewModel.search}
        autoComplete="off"
        onChange={handleChange}
      />
      <span
        className={`e-icons text-lg cursor-pointer icon ${props?.icon ?? " search-8icon-"}`}
        onClick={()=>props?.handleSearch(searchViewModel.search)}
      ></span>
    </div>
  );
};

export default SearchBox;
