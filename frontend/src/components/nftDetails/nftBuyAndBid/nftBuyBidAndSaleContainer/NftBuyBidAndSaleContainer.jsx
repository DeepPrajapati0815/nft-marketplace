import NftBuyAndMakeOffer from "./nftBuyAndMakeOffer/NftBuyAndMakeOffer";
import "./nftBuyBidAndSaleContainer.css";

const NftBuyBidAndSaleContainer = ({ nft, setIsPublished, isPublised }) => {
  return (
    <div className="nftBuyBidAndSaleContainer">
      {/* <NftSaleTime></NftSaleTime> */}
      <NftBuyAndMakeOffer
        isPublised={isPublised}
        setIsPublished={setIsPublished}
        nft={nft}
      ></NftBuyAndMakeOffer>
    </div>
  );
};

export default NftBuyBidAndSaleContainer;
