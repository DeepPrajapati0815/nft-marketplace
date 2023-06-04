import CategoriesHeading from "./categoriesHeading/CategoriesHeading";
import CategoriesHeadingDetails from "./categoriesHeadingDetails/CategoriesHeadingDetails";
import "./categoriesHeadingAndDetails.css";

const CategoriesHeadingAndDetails = ({ name, description }) => {
  return (
    <div className="categoriesHeadingAndDetailsContainer">
      <CategoriesHeading name={name} />
      <CategoriesHeadingDetails description={description} />
    </div>
  );
};

export default CategoriesHeadingAndDetails;
