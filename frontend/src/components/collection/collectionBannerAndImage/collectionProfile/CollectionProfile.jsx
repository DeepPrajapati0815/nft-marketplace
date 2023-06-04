import "./collectionProfile.css";

const CollectionProfile = ({ img }) => {
  return (
    <div className="collectionProfileContainer">
      <img className="collectionProfile" src={img} alt="" />
    </div>
  );
};

export default CollectionProfile;
