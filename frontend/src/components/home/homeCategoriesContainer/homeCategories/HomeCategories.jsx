import CategoryCard from "./categoryCard/CategoryCard";
import "./homeCategories.css";

import data from "../../../../utils/Categorydata";

const HomeCategories = () => {
  return (
    <div className="homeCategoriesContainer">
      {data?.map((cat, i) => (
        <CategoryCard key={i} img={cat.img} name={cat.name} />
      ))}
    </div>
  );
};

export default HomeCategories;
