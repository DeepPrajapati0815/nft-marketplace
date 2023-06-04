import "./priceUnderHeading.css";

const PriceUnderHeading = ({ title }) => {
  return (
    <div className="priceUnderHeadingContainer">
      <p className="priceUnderHeading  ">{title}</p>
    </div>
  );
};

export default PriceUnderHeading;
