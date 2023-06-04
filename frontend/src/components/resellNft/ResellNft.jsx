import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import axios from "../../utils/axios";
import NftAuthorName from "../nftDetails/nftBuyAndBid/nftAuthorName/NftAuthorName";
import NftTokenName from "../nftDetails/nftBuyAndBid/nftTokenName/NftTokenName";
import NftPhotoAndDetails from "../nftDetails/NftPhotoAndDetails/NftPhotoAndDetails";
import NFTResellInput from "./nftResell-input/NFTResellInput";
import "./resellNft.css";

const ResellNft = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);

  const { fetchNFT } = useContext(NFTMarketplaceContext);

  const fetchNFTFromApi = async () => {
    try {
      const response = await axios.get(`/api/v1/nfts/${id}`);
      return response?.data?.data?.nft;
    } catch (error) {}
  };

  const fetchSingleNft = async (tokenId) => {
    const data = await fetchNFT(Number(tokenId));
    setNft(data);
  };

  useEffect(() => {
    fetchNFTFromApi().then((data) => {
      setNft(data);
    });
    // fetchSingleNft();
  }, []);

  return (
    <div className="resellNftDetailsMainContainer">
      <div className="resellNftPhoto">
        <NftPhotoAndDetails nft={nft} />
      </div>
      <div className="resellNftDetailsContainer">
        <NftAuthorName nft={nft} />
        <NftTokenName nft={nft} />

        <div className="nftBuyBidAndSaleContainer">
          <NFTResellInput nft={nft}></NFTResellInput>
        </div>
      </div>
    </div>
  );
};

export default ResellNft;
