import CollectionCards from "../collectionCards/CollectionCards";
import CollectionHeading from "../collectionHeading/CollectionHeading";
import "./collectionContainer.css";

const CollectionContainer = ({ collections }) => {
  return (
    <div className="collectionContainer">
      <CollectionHeading />
      <CollectionCards collections={collections} />
    </div>
  );
};

export default CollectionContainer;
