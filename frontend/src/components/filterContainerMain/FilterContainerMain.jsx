import FilterButton from "../filterButton/FilterButton";
import "./filterContainerMain.css";

const FilterContainerMain = ({ openFilter, setOpenFilter }) => {
  return (
    <>
      <div className="filterContainerMain">
        <FilterButton openFilter={openFilter} setOpenFilter={setOpenFilter} />
      </div>
    </>
  );
};

export default FilterContainerMain;
