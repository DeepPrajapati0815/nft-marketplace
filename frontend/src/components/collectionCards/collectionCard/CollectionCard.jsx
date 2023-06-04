const CollectionCard = ({ collection }) => {
  return (
    <div className="collectionCardContainer">
      <div className="collectionCardImageContainer">
        <img src={collection.image} className="collectionCardImage" alt="" />
        <div className="collectionCardOwnerLogoAndHeadingContainer">
          <img
            src="https://www.cnet.com/a/img/resize/c5b48e90abe8b7fe339fc0139f3834dbe434fee5/hub/2021/11/29/f566750f-79b6-4be9-9c32-8402f58ba0ef/richerd.png?auto=webp&width=1200"
            alt="logoOwner"
            className="logoOwner"
          />
          <span className="ownerName">{collection?.collectionName}</span>

          <img
            src="https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
            alt="verificationLogo"
            className="verificationLogo"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
