import "./collectionSpecification.css";

const CollectionSpecification = ({ stats }) => {
  return (
    <div className="collectionSpecificationContainerMain">
      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">
          {stats.total ? stats.total?.toFixed(2) : 0} ETH
        </p>
        <h3 className="collectionSpecificationHeading">TOTAL VOLUME</h3>
      </div>

      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">
          {stats?.avg ? stats?.avg?.toFixed(2) : 0} ETH
        </p>
        <h3 className="collectionSpecificationHeading">FLOOR PRICE</h3>
      </div>
    </div>
  );
};

export default CollectionSpecification;
