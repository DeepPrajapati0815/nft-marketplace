import React, { useContext, useEffect, useState } from "react";
import HomeContainerMain from "../../components/home/HomeContainerMain";
import Loader from "../../components/loader/Loader";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import axios from "../../utils/axios";

const HomePage = () => {
  const [popularNfts, setPolpularsNfts] = useState([]);
  const [trendingNfts, setTrendingNfts] = useState([]);

  const { random, setIsLoading } = useContext(NFTMarketplaceContext);

  const fetchPopularNfts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/v1/nfts/popular-nfts");
      if (res.data?.nfts) {
        setPolpularsNfts(res.data?.nfts);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchTrendingNfts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/v1/nfts/trending-nfts");

      if (res.data.nfts) {
        setTrendingNfts(res.data?.nfts);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPopularNfts();
      await fetchTrendingNfts();
    })();
  }, [random]);

  const { isLoading } = useContext(NFTMarketplaceContext);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <HomeContainerMain
        popularNfts={popularNfts}
        trendingNfts={trendingNfts}
      />
    </>
  );
};

export default HomePage;
