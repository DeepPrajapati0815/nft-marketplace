import "./rangeFilter.css";
import { useEffect, useState } from "react";

const RangeFilter = ({ filter, setFilter }) => {
  return (
    <div className="rangeFilterContainer">
      <h3 className="priceRangeHeading">Price Range</h3>
      <input
        autocomplete="off"
        type="number"
        placeholder="Min.."
        value={filter.minPrice}
        onChange={(e) => {
          setFilter({ ...filter, minPrice: e.target.value });
        }}
        className="priceInput"
        min={0}
      />
      <p className="colon">:</p>
      <input
        autocomplete="off"
        type="number"
        value={filter?.maxPrice}
        onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
        placeholder="Max.."
        className="priceInput"
        min={0}
      />
    </div>
  );
};

export default RangeFilter;
