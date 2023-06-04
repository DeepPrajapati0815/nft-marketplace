import React from "react";
import { Link } from "react-router-dom";
const CategoryCard = ({ img, name }) => {
  return (
    <div className="homeCategoriesCards">
      <Link
        style={{ textDecoration: "none" }}
        to={`/marketplace/categories/${name.toLowerCase()}`}
      >
        <div className="homeCategoriesCardImageContainer">
          <img src={img} alt="" className="homeCategoriesCardImage" />
        </div>
        <div className="homeCategoriesCardsContentContainer">
          <p className="homeCategoriesCardsContent">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
