import "./homeTrendingCollectionItems.css";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";

const HomeTrendingCollectionItems = () => {
  return (
    <div className="homeTrendingCollectionItemsContainer">
      <div className="homeTrendingCollectionItemsProfileAndNameContainer">
        <div className="homeTrendingCollectionItemsProfileContainer">
          <img
            src="https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300"
            alt=""
            className="homeTrendingCollectionItemsProfileImg"
          />
        </div>
        <div className="homeTrendingCollectionItemsNameContainer">
          <h3 className="homeTrendingCollectionItemsName">Deep Collection</h3>
        </div>
      </div>
      <div className="homeTrendingCollectionItemsContainer">
        <h3 className="homeTrendingCollectionItems">1.9k ETH</h3>
        <div className="homeTrendingCollectionItemVolChange">
          <HiArrowUpRight className="arrowUpRight" />
          <HiArrowDownLeft className="arrowBottomleft" />
          <h3 className="homeTrendingCollectionItems">21.99%</h3>
        </div>
        <h3 className="homeTrendingCollectionItems">4.5k</h3>
        <h3 className="homeTrendingCollectionItems">8888</h3>
      </div>
    </div>
  );
};

export default HomeTrendingCollectionItems;
