import { MdOutlineDescription } from "react-icons/md";
import "./nftDetailHeading.css";

const NftDetailHeading = () => {
  return (
    <div className="nftDetailHeadingContainer">
      <MdOutlineDescription className="nftDescriptionIcon" />
      <h2 className="nftDescription">Description</h2>
    </div>
  );
};

export default NftDetailHeading;
