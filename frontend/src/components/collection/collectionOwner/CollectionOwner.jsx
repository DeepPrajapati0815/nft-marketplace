import "./collectionOwner.css";

const CollectionOwner = ({ collection }) => {
  return (
    <div className="collectionOwnerAndVerificationContainer">
      <h5 className="collectionOwner">
        By{" "}
        {collection?.creator?.slice(0, 7) +
          "..." +
          collection?.creator?.slice(37)}
      </h5>
      <div className="collectionOwnerVerificationImgContainer">
        <img
          className="collectionOwnerVerificationImg"
          src="	https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default CollectionOwner;
