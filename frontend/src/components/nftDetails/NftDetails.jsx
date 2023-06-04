import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import NftBuyAndBidMainContainer from "./nftBuyAndBid/NftBuyAndBidMainContainer";
import "./nftDetails.css";
import Loader from "../../components/loader/Loader";
import NftPhotoAndDetails from "./NftPhotoAndDetails/NftPhotoAndDetails";

import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const NftDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);

  const { setIsLoading, isLoading } = useContext(NFTMarketplaceContext);

  const currentAccount = localStorage.getItem("account");

  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);

  const [isPublised, setIsPublished] = useState(false);

  const fetchNFTFromApi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/nfts/${id}`);
      const data = response?.data?.data?.nft;
      setNft(data);
      setLike(() => {
        if (data.wishlist.includes(currentAccount?.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      setIsPublished(data?.isPublished);
      setLikes(data?.wishlist?.length);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  // For toggle the like
  const toggleLikHandler = () => {
    setLike(!like);
  };

  const setLikeHandler = (likes) => {
    setLikes(likes);
  };

  useEffect(() => {
    (async () => {
      await fetchNFTFromApi();
    })();
  }, [currentAccount, id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="NftDetailsMainContainer">
      <NftPhotoAndDetails nft={nft} />
      <NftBuyAndBidMainContainer
        like={like}
        isPublised={isPublised}
        setIsPublished={setIsPublished}
        toggleLikHandler={toggleLikHandler}
        setLikeHandler={setLikeHandler}
        likes={likes}
        nft={nft}
      />
    </div>
  );
};

export default NftDetails;
