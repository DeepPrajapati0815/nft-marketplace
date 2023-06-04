import PriceUnderContainer from "./home-priceUnderContainer/PriceUnderContainer";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeCategoriesContainer from "./homeCategoriesContainer/HomeCategoriesContainer";
import "./homeContainerMain.css";
// import HomeTrendingCollection from "./homeTrendingCollection/HomeTrendingCollection";

const HomeContainerMain = ({ popularNfts, trendingNfts }) => {
  return (
    <div className="homeContainerMain">
      <HomeCarousel />
      <HomeCategoriesContainer />
      <PriceUnderContainer
        popularNfts={popularNfts}
        trendingNfts={trendingNfts}
      />
    </div>
  );
};

export default HomeContainerMain;
