// import { Link } from "react-router-dom";
import "./sortList.css";

const SortList = ({ sort, setSort }) => {
  const list = [
    "Listed: Recent",
    "Listed: Oldest",
    "Price: Lowest",
    "Price: Highest",
  ];

  const handleFilter = (e) => {
    setSort(e.target.innerHTML);
  };

  return (
    <div className="sortListContainer">
      {list.map((item, i) => (
        <button key={i} className="SortListBtn" onClick={handleFilter}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default SortList;
