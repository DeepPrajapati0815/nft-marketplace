import "./categoriesHeading.css";

const CategoriesHeading = ({ name }) => {
  return (
    <div className="categoriesHeadingContainer">
      <h1 className="categoriesHeading">{name}</h1>
    </div>
  );
};

export default CategoriesHeading;
