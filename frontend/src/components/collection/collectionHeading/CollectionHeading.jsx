import "./collectionHeading.css";

const CollectionHeading = ({ collection }) => {
  return (
    <div className="collectionHeadingContainerMain">
      <div className="collectionHeadingAndVerificationImgContainer">
        <h1 className="collectionHeading">{collection?.collectionName}</h1>
        <div className="collectionVerificationImgContainer">
          <img
            className="collectionVerificationImg"
            src="	https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionHeading;
