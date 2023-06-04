import "./nftCardsContainerMain.css";
import NftCardsContainer from "./nftCardContainer/NftCardContainer";
import { useState } from "react";
import ConfirmPublish from "../confirmPublish/ConfirmPublish";

const NftCardsContainerMain = ({ openFilter, nfts, setNfts, filter }) => (
  <div className="nftCardsContainerMain">
    <NftCardsContainer
      nfts={nfts}
      filter={filter}
      setNfts={setNfts}
      openFilter={openFilter}
    />
  </div>
);

export default NftCardsContainerMain;
