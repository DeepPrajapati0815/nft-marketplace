import "./categoriesHeadingDetails.css";

const CategoriesHeadingDetails = ({ description }) => {
  return (
    <div className="categoriesHeadingDetailsContainer">
      <p className="categoriesHeadingDetails">{description}</p>
    </div>
  );
};

export default CategoriesHeadingDetails;
