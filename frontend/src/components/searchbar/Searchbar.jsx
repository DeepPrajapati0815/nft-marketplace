import React from "react";
import { CgClose } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";

const Searchbar = ({
  search,
  setSearch,
  title,
  marginTop,
  color,
  borderRadius,
  background,
  borderBottom,
  openCollectionItems,
  setOpenCollectionItems,
}) => {
  return (
    <div
      className="searchContainer "
      onClick={() => setOpenCollectionItems(!openCollectionItems)}
    >
      <input
        style={{
          marginTop: marginTop && marginTop,
          background: background,
          color: color,
          borderRadius: borderRadius && borderRadius,
          borderBottom: borderBottom && borderBottom,
        }}
        autoComplete="off"
        type="search"
        name="search"
        id="search"
        className="searchBar"
        placeholder={title}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search !== "" && (
        <CgClose
          style={{ color: color && color }}
          className="searchColseIcon"
          onClick={() => setSearch("")}
        ></CgClose>
      )}
      <div>
        <BiSearch
          className="searchIcon"
          style={{ color: color && color }}
        ></BiSearch>
      </div>
    </div>
  );
};

export default Searchbar;
