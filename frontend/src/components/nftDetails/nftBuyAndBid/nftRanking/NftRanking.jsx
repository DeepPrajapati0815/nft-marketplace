import { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { NFTMarketplaceContext } from "../../../../context/NFTMarketplaceContext";
import axios from "../../../../utils/axios";
import "./nftRanking.css";

const NftRanking = ({ like, likes, toggleLikHandler, setLikeHandler, nft }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const handleLike = async () => {
    if (currentAccount !== "") {
      toggleLikHandler();
      const data = { like, account: currentAccount, id };
      const res = await axios.post("/api/v1/nfts/favorites", data, {
        headers: { Authorization: token },
      });
      setLikeHandler(res.data.count);
    }
  };

  return (
    <>
      <div className="nftRankingContainer">
        <div className="rankingContainer">
          <p className="ranking">#{nft?.tokenId}</p>
        </div>
        <div className="favoritesContainer" onClick={handleLike}>
          {like ? (
            <AiFillHeart className="favoritesFillImg"></AiFillHeart>
          ) : (
            <FiHeart className="favoritesImg" />
          )}
          <p className="favorites">{likes} favorites</p>
        </div>
      </div>
    </>
  );
};

export default NftRanking;
