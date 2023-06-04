import { useEffect, useState } from "react";
import "./categoriesCards.css";
import axios from "../../../../utils/axios";

const CategoriesCards = ({ collection }) => {
  const [nfts, setNfts] = useState([]);

  const [stats, setStats] = useState({ total: 0, avg: 0, owners: 0 });

  const token = localStorage.getItem("token");

  const fetchSingleCollection = async () => {
    try {
      const res = await axios.get(`/api/v1/collections/${collection?._id}`, {
        headers: { Authorization: token },
      });
      const total = res?.data?.total[0];

      setNfts(res?.data?.nfts);
      setStats({
        total: total?.TotalAmount,
        avg: total?.avg,
        owners: total?.owners,
      });
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await fetchSingleCollection();
    })();
  }, []);

  return (
    <div className="categoriesCardsContainer">
      <div className="categoriesCardsCollectionImgAndCollectionNameContainer">
        <div className="categoriesCardsCollectionImgContainer">
          <img
            className="categoriesCardsCollectionImg"
            src={collection?.image}
            alt=""
          />
        </div>
        <div className="categoriesCardsCollectionNameContainerMain">
          <div className="categoriesCardsCollectionNameContainer">
            <h3 className="categoriesCardsCollectionName">
              {collection?.collectionName}
            </h3>
            <img
              className="categoriesCardsCollectionNameVerificationImg"
              src="https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
              alt=""
            />
          </div>
          <div className="categoriesCardsCollectionNumberOfItemsContainer">
            <p className="categoriesCardsCollectionNumberOfItems">
              {nfts?.length} items
            </p>
          </div>
        </div>
      </div>

      <div className="categoriesCardsDataContainer">
        <p className="categoriesCardsData">
          {collection?.collectionDescription.slice(0, 35) + " ..."}
        </p>
      </div>

      <div className="categoriesCardsImageContainer">
        {nfts?.slice(0, 3)?.map((nft) => (
          <img className="categoriesCardsImage" src={nft?.media} alt="" />
        ))}
      </div>
    </div>
  );
};

export default CategoriesCards;
