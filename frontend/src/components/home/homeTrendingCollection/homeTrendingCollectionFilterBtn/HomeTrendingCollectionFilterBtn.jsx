import "./homeTrendingCollectionFilterBtn.css";
import { AiFillCaretDown } from "react-icons/ai";

const HomeTrendingCollectionFilterBtn = () => {
  return (
    <div className="homeTrendingCollectionFilterBtnContainer">
      <button className="HomeTrendingCollectionFilterBtn">
        <span className="homeTrendingCollectionBtnSpan">Day 1</span>
        <AiFillCaretDown className="homeTrendingCollectionBtnIcon" />
      </button>
      <div className="homeTrendingCollectionFilterContainerOpen"></div>
    </div>
  );
};

export default HomeTrendingCollectionFilterBtn;
