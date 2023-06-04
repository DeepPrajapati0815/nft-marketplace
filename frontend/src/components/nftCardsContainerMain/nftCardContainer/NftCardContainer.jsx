import NftAudioCard from "./nftCard/NftAudioCard/NftAudioCard";
import NftCard from "./nftCard/NftCard";
import "./nftCardContainer.css";

const NftCardContainer = ({ openFilter, nfts, filter }) => {
  return nfts?.length > 0 ? (
    <div className="nftCardContainer">
      {nfts?.map((nft, i) => {
        return nft?.fileType === "audio" ? (
          <NftAudioCard key={i} filter={filter} nft={nft} />
        ) : (
          <NftCard filter={filter} key={i} nft={nft} />
        );
      })}
    </div>
  ) : (
    <div className="nftCardContainerNotFound">
      <p style={{ color: "#fff" }}>No items found</p>
    </div>
  );
};

export default NftCardContainer;
