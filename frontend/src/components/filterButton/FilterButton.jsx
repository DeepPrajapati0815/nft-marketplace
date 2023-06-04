import "./filterButton.css";

const FilterButton = ({ setOpenFilter, openFilter }) => {
  return (
    <div className="filterButtonContainer">
      <button
        onClick={() => setOpenFilter(!openFilter)}
        className="filterButton"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/460/460326.png"
          alt=""
          className="funnelImage"
        />
        Filters
      </button>
    </div>
  );
};

export default FilterButton;
