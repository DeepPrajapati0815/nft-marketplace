import "./nftBuyAndBidMainContainer.css";
import NftAuthorName from "./nftAuthorName/NftAuthorName";
import NftTokenName from "./nftTokenName/NftTokenName";
import NftRanking from "./nftRanking/NftRanking";
import NftBuyBidAndSaleContainer from "./nftBuyBidAndSaleContainer/NftBuyBidAndSaleContainer";
import NftDetailContainer from "./nftDetails/NftDetailContainer";

const NftBuyAndBidMainContainer = ({
  nft,
  like,
  setIsPublished,
  isPublised,
  likes,
  toggleLikHandler,
  setLikeHandler,
}) => {
  const currentAccount = localStorage.getItem("account");
  return (
    <div className="NftBuyAndBidMainContainer">
      <NftAuthorName nft={nft} />
      <NftTokenName nft={nft} />
      {currentAccount && (
        <NftRanking
          nft={nft}
          like={like}
          likes={likes}
          toggleLikHandler={toggleLikHandler}
          setLikeHandler={setLikeHandler}
        ></NftRanking>
      )}
      <NftBuyBidAndSaleContainer
        isPublised={isPublised}
        setIsPublished={setIsPublished}
        nft={nft}
      />
      <NftDetailContainer nft={nft} />
    </div>
  );
};

export default NftBuyAndBidMainContainer;
