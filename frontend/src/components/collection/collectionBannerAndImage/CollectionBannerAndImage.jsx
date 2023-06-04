import CollectionBanner from "./collectionBanner/CollectionBanner";
import CollectionProfile from "./collectionProfile/CollectionProfile";

const CollectionBannerAndImage = ({ collection }) => {
  return (
    <div className="collectionBannerAndImageContainer">
      <CollectionBanner banner={collection?.banner} />
      <CollectionProfile img={collection?.image} />
    </div>
  );
};

export default CollectionBannerAndImage;
