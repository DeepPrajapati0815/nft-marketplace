import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "axios";
import { useEffect } from "react";
import "./nftResellInput.css";

const NFTResellInput = ({ nft }) => {
  const [usd, setUsd] = useState(0);
  const [inr, setInr] = useState(0);
  const [price, setPrice] = useState(null);
  const { id } = useParams();

  const { createSale, setIsLoading } = useContext(NFTMarketplaceContext);

  const fetchCurrentPriceOfEth = async () => {
    try {
      const inrPrice = await axios.get(
        "https://api.coinconvert.net/convert/eth/inr?amount=" + nft?.price
      );
      setInr(Math.floor(inrPrice.data.INR));

      const usdPrice = await axios.get(
        "https://api.coinconvert.net/convert/eth/usd?amount=" + nft?.price
      );

      setUsd(usdPrice.data.USD);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCurrentPriceOfEth();
  });

  return (
    <div className="nftBuyAndMakeOfferContainer">
      <div className="currentPriceContainer">
        <p className="currentPrice">Current price</p>
      </div>
      <div className="nftPriceContainer">
        <div className="ethereumPriceContainer">
          <p className="ethereumPrice">{nft?.price} ETH</p>
        </div>
        <div className="USDPriceContainer">
          <p className="USDPrice">${usd}</p>
        </div>
        <div className="INRPriceContainer">
          <p className="INRPrice">&#x20B9;{inr} INR</p>
        </div>
      </div>

      <div className="ResellNftInputContainers">
        <input
          autocomplete="off"
          className="ResellNftInput"
          value={price}
          type="number"
          placeholder={"Resell price..."}
          onChange={(e) => setPrice(e.target.value)}
          required
        ></input>
      </div>
      <div className="resellNftUploadBtnContainer">
        <button
          className="resellNftUploadBtn"
          onClick={() => {
            setIsLoading(true);
            createSale(nft.tokenURI, price, nft.name, 0, "", true, nft.tokenId);
          }}
        >
          Resell NFT
        </button>
      </div>
    </div>
  );
};

export default NFTResellInput;
