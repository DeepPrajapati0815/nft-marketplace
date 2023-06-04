import "./categoriesFilter.css";

import data from "../../utils/Categorydata";

const CategoriesFilter = ({ setFilter, filter }) => {
  return (
    <div className="categoriesFilterContainer">
      <h3 className="categoriesHeading">Categories</h3>
      <div className="checkBoxContainer">
        {data?.map((category) => (
          <>
            <input
              autocomplete="off"
              type="checkbox"
              value={category?.name?.toLowerCase()}
              className="categoriesCheckbox"
              name={category?.name}
              onChange={(e) => {
                if (
                  e.target.checked &&
                  !filter?.category?.includes(e.target.value)
                ) {
                  setFilter({
                    ...filter,
                    category: [...filter?.category, e.target.value],
                  });
                } else {
                  const filteredArr = filter?.category?.filter(
                    (el) => el !== e.target.value
                  );
                  setFilter({
                    ...filter,
                    category: filteredArr,
                  });
                }
              }}
            />
            {category?.name}
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
