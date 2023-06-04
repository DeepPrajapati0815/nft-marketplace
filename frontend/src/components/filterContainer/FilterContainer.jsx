import CategoriesFilter from "../categoriesFilter/CategoriesFilter";
import CurrencyFilter from "../currencyFilter/CurrencyFilter";
import RangeFilter from "../rangeFilter/RangeFilter";
import "./filterContainer.css";

const FilterContainer = ({ filter, setFilter, setFilteredNfts }) => {
  return (
    <div className="filterContainer">
      <CurrencyFilter filter={filter} setFilter={setFilter} />
      <hr className="hr" />
      <RangeFilter filter={filter} setFilter={setFilter} />
      <hr className="hr" />
      <CategoriesFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default FilterContainer;
