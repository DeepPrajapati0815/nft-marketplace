import ResellNft from "../../components/resellNft/ResellNft";

import Loader from "../../components/loader/Loader";
import { useContext } from "react";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const ResellNftPage = () => {
  const { isLoading } = useContext(NFTMarketplaceContext);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="resellNftMainPage">
      <ResellNft />
    </div>
  );
};

export default ResellNftPage;
