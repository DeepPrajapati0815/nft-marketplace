import "./collectionBanner.css";

const CollectionBanner = ({ banner }) => {
  return (
    <div className="collectionBannerContainer">
      <img
        className="collectionBanner"
        src={
          banner
            ? banner
            : "https://bbdu.ac.in/wp-content/uploads/2020/05/banner-background-5.jpg"
        }
        alt=""
      />
    </div>
  );
};

export default CollectionBanner;
