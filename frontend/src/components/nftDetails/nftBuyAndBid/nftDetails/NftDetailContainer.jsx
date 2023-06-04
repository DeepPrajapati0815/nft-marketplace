import "./nftDetailContainer.css";
import NftDetailHeading from "./nftDetailHeading/NftDetailHeading";
import NftDetailsContent from "./nftDetailsContent/NftDetailsContent";

const NftDetailContainer = ({ nft }) => {
  return (
    <div className="nftDetailContainer">
      <NftDetailHeading />
      <hr className="nftDetailContainerHr" />
      <NftDetailsContent nft={nft} />
    </div>
  );
};

export default NftDetailContainer;
