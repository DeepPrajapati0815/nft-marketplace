import HomeNftsSection from "../homeNftsSectionContainer/HomeNftsSection";
import "./priceUnderContainer.css";
import PriceUnderHeading from "./priceUnderHeading/PriceUnderHeading";

const PriceUnderContainer = ({ popularNfts, trendingNfts }) => {
  return (
    <div className="priceUnderContainerMain">
      <PriceUnderHeading title={"Top 10 Popular Nfts"} />
      <HomeNftsSection nfts={popularNfts} />

      <PriceUnderHeading title={"Latest Trending Nfts"} />
      <HomeNftsSection nfts={trendingNfts} />
    </div>
  );
};

export default PriceUnderContainer;
