import { useContext, useEffect, useState } from "react";
import CategoriesBanner from "./categoriesBanner/CategoriesBanner";
import CategoriesCardContainer from "./categoriesCardContainer/CategoriesCardContainer";
import CategoriesHeadingAndDetails from "./categoriesHeadingAndDetails/CategoriesHeadingAndDetails";
import CategoriesList from "./categoriesList/CategoriesList";
import Loader from "../loader/Loader";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const Categories = ({ name, img, description, menuData }) => {
  const { category } = useParams();

  const [collections, setCollections] = useState([]);
  const { setIsLoading, isLoading } = useContext(NFTMarketplaceContext);

  const fetchByCategoryNFTsFromApi = async (category) => {
    try {
      const response = await axios.get(
        `/api/v1/collections/categories/${category}`
      );
      const data = response.data.collections;

      setCollections(data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchByCategoryNFTsFromApi(category);
      setIsLoading(false);
    })();
  }, [category]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="categoriesMainContainer">
      <CategoriesList menuData={menuData} />
      <CategoriesBanner img={img} />
      <CategoriesHeadingAndDetails name={name} description={description} />
      <CategoriesCardContainer collections={collections} />
    </div>
  );
};

export default Categories;
