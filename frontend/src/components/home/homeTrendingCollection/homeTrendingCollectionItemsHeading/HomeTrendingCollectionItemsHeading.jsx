import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "./homeTrendingCollectionItemsHeading.css";

const HomeTrendingCollectionItemsHeading = () => {
  return (
    <div className="homeTrendingCollectionItemsHeadingContainer">
      <div className="homeTrendingCollectionItemCollectionHeadingContainer">
        <h2 className="homeTrendingCollectionItemCollectionHeading">
          Collection Name
        </h2>
      </div>
      <div className="homeTrendingCollectionItemsHeadingContainerMain">
        <div className="homeTrendingCollectionHeadingContainerMain">
          <div className="homeTrendingCollectionHeadingContainer">
            <h2 className="homeTrendingCollectionItemHeading">1-day vol.</h2>
          </div>
          <div className="homeTrendingCollectionHeadingIconContainer">
            <AiFillCaretDown className="homeTrendingCollectionIconDown" />
            <AiFillCaretUp className="homeTrendingCollectionIconUp" />
          </div>
        </div>
        <div className="homeTrendingCollectionHeadingContainerMain">
          <div className="homeTrendingCollectionHeadingContainer">
            <h2 className="homeTrendingCollectionItemHeading">Vol. chg.</h2>
          </div>
          <div className="homeTrendingCollectionHeadingIconContainer">
            <AiFillCaretDown className="homeTrendingCollectionIconDown" />
            <AiFillCaretUp className="homeTrendingCollectionIconUp" />
          </div>
        </div>
        <div className="homeTrendingCollectionHeadingContainerMain">
          <div className="homeTrendingCollectionHeadingContainer">
            <h2 className="homeTrendingCollectionItemHeading">Owners</h2>
          </div>
          <div className="homeTrendingCollectionHeadingIconContainer">
            <AiFillCaretDown className="homeTrendingCollectionIconDown" />
            <AiFillCaretUp className="homeTrendingCollectionIconUp" />
          </div>
        </div>
        <div className="homeTrendingCollectionHeadingContainerMain">
          <div className="homeTrendingCollectionHeadingContainer">
            <h2 className="homeTrendingCollectionItemHeading">Items</h2>
          </div>
          <div className="homeTrendingCollectionHeadingIconContainer">
            <AiFillCaretDown className="homeTrendingCollectionIconDown" />
            <AiFillCaretUp className="homeTrendingCollectionIconUp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTrendingCollectionItemsHeading;
