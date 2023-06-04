import NftCard from "../../nftCardsContainerMain/nftCardContainer/nftCard/NftCard";
import NftAudioCard from "../../nftCardsContainerMain/nftCardContainer/nftCard/NftAudioCard/NftAudioCard";

const HomeNftsSection = ({ nfts }) => {
  return (
    <>
      <div className="nftCardContainer priceUnderCardsContainer">
        {nfts?.map((nft, i) => {
          return nft?.fileType === "audio" ? (
            <NftAudioCard key={i} nft={nft} />
          ) : (
            <NftCard key={i} nft={nft} />
          );
        })}
      </div>
    </>
  );
};

export default HomeNftsSection;
