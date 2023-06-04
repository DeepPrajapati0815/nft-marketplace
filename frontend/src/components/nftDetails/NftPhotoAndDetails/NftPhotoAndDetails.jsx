import NftPhoto from "./NftPhoto/NftPhoto";
import "./nftPhotoAndDetails.css";

const NftPhotoAndDetails = ({ nft }) => {
  return (
    <div className="nftPhotoAndDetails">
      <NftPhoto nft={nft} />
    </div>
  );
};

export default NftPhotoAndDetails;
