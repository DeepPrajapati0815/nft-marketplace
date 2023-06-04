import HomeCategoriesHeading from "./homeCategoriesHeading/HomeCategoriesHeading";
import "./homeCategoriesContainer.css";
import HomeCategories from "./homeCategories/HomeCategories";

const HomeCategoriesContainer = () => {
  return (
    <div className="homeCategoriesContainerMain">
      <HomeCategoriesHeading />
      <HomeCategories />
    </div>
  );
};

export default HomeCategoriesContainer;
