import "./categoriesBanner.css";

const CategoriesBanner = ({ img }) => {
  return (
    <div className="categoriesBannerImgContainer">
      <img className="categoriesBannerImg" src={img} alt="" />
    </div>
  );
};

export default CategoriesBanner;
