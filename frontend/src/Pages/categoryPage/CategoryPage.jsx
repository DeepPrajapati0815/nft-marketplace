import React from "react";
import { useParams } from "react-router-dom";
import Categories from "../../components/categories/Categories";
import categoryData from "../../utils/Categorydata";

const CategoryPage = () => {
  const { category } = useParams();

  const menuData = categoryData.find(
    (cat) => cat.name.toLowerCase() === category
  );

  return (
    <>
      <Categories
        menuData={categoryData}
        name={menuData.name}
        img={menuData.img}
        description={menuData.description}
      />
    </>
  );
};

export default CategoryPage;
