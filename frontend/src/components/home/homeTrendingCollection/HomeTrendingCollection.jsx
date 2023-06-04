import HomeTrendingCollectionFilterBtn from "./homeTrendingCollectionFilterBtn/HomeTrendingCollectionFilterBtn";
import HomeTrendingCollectionHeading from "./homeTrendingCollectionHeading/HomeTrendingCollectionHeading";
import "./homeTrendingCollection.css";
import HomeTrendingCollectionItemsHeading from "./homeTrendingCollectionItemsHeading/HomeTrendingCollectionItemsHeading";
import HomeTrendingCollectionItems from "./homeTrendingCollectionItems/HomeTrendingCollectionItems";

const HomeTrendingCollection = () => {
  return (
    <div className="homeTrendingCollectionContainer">
      <HomeTrendingCollectionHeading />
      <HomeTrendingCollectionFilterBtn />
      <HomeTrendingCollectionItemsHeading />
      <HomeTrendingCollectionItems />
    </div>
  );
};

export default HomeTrendingCollection;
