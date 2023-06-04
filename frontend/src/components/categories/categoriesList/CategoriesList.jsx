import { Link } from "react-router-dom";
import "./categoriesList.css";

const CategoriesList = ({ menuData }) => {
  return (
    <div className="categoriesListContainer">
      <ul className="categoriesListUl">
        {menuData?.map((cat, i) => (
          <Link
            style={{ textDecoration: "none" }}
            key={i}
            to={"/marketplace/categories/" + cat?.name.toLowerCase()}
          >
            <li className="categoriesListItems">{cat.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
