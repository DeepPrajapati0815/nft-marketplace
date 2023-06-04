import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import axiosInstance from "../../../../../utils/axios";
import "./nftBuyAndMakeOffer.css";

import { Link, useParams } from "react-router-dom";
import { NFTMarketplaceAddress } from "../../../../../context/contanst";
import { NFTMarketplaceContext } from "../../../../../context/NFTMarketplaceContext";
import { toast } from "react-hot-toast";

const NftBuyAndMakeOffer = ({ nft, setIsPublished, isPublised }) => {
  const [usd, setUsd] = useState(0);
  const [inr, setInr] = useState(0);

  const { id } = useParams();

  const {
    buyNft,
    currentAccount,
    setIsLoading,
    royaltyBalance,
    getRoyaltyBalance,
    withdrawnRoyaltyAmount,
  } = useContext(NFTMarketplaceContext);

  const token = localStorage.getItem("token");

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

  const handlePublish = async () => {
    try {
      if (isPublised) {
        await axiosInstance.post(
          `/api/v1/nfts/pusblishOrUnpublish/${id}?publish=false`,
          {},
          { headers: { Authorization: token } }
        );
        setIsPublished(false);

        toast.success("NFT unpublished Successfull!");
      } else {
        await axiosInstance.post(
          `/api/v1/nfts/pusblishOrUnpublish/${id}?publish=true`,
          {},
          { headers: { Authorization: token } }
        );
        setIsPublished(true);

        toast.success("NFT published Successfull!");
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await fetchCurrentPriceOfEth();
      if (currentAccount) {
        await getRoyaltyBalance(nft?.tokenId);
      }
    })();
  }, []);

  return (
    <>
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

        <div className="buyNowContainerMain">
          {!currentAccount && (
            <p style={{ color: "white", marginRight: "20px" }}>
              Sign in to purchase NFT
            </p>
          )}
          {NFTMarketplaceAddress.toLowerCase() === nft?.owner &&
            currentAccount?.toLowerCase() === nft?.seller && (
              <div className="OwnedNftPublishNft">
                <p style={{ color: "white", marginRight: "20px" }}>
                  You owned this NFT
                </p>

                {!isPublised ? (
                  <button
                    className="publishOrUnpublishBtn"
                    onClick={handlePublish}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className="publishOrUnpublishBtn"
                    onClick={handlePublish}
                  >
                    Unpublish
                  </button>
                )}
              </div>
            )}

          {currentAccount?.toLowerCase() === nft?.owner ||
          (NFTMarketplaceAddress.toLowerCase() !== nft?.owner &&
            currentAccount?.toLowerCase() === nft?.seller) ? (
            <div className="buyNowContainer">
              <Link
                style={{ textDecoration: "none" }}
                to={"/marketplace/resell/" + id}
              >
                <button className="addToCartBtn">
                  <FaRegHandshake className="buyNowIcons" />
                  <span className="buyNowSpan"> Resell NFT</span>
                </button>
              </Link>
            </div>
          ) : (
            currentAccount?.toLowerCase() === nft?.seller ||
            (currentAccount && (
              <>
                <div className="buyNowContainer">
                  <button
                    className="addToCartBtn"
                    onClick={() => {
                      setIsLoading(true);
                      buyNft(nft);
                    }}
                  >
                    <FaRegHandshake className="buyNowIcons" />
                    <span className="buyNowSpan"> Buy Now</span>
                  </button>
                </div>
              </>
            ))
          )}
        </div>
      </div>

      <div className="nftBuyAndMakeOfferContainer">
        <div className="saleAndTime" style={{ marginTop: "30px" }}>
          {" "}
          <p className="nftCreatorDetails">
            Creator :{" "}
            {nft?.creator?.slice(0, 7) + "..." + nft?.creator?.slice(34)}
          </p>
          <p className="nftCreatorDetails">Royalty : {nft?.royalty} %</p>
          <p className="nftCreatorDetails">
            Royalty Recipient :{" "}
            {nft?.royaltyRecipient?.slice(0, 7) +
              "..." +
              nft?.royaltyRecipient?.slice(34)}
          </p>
        </div>
        {nft?.royaltyRecipient?.toLowerCase() ===
          currentAccount?.toLowerCase() && (
          <div
            className="saleAndTime"
            style={{ marginTop: "10px", fontSize: "0.9rem" }}
          >
            <p className="nftCreatorDetails">
              Your Royalty Balance : {royaltyBalance}
            </p>
            <div className="buyNowContainer" style={{ marginTop: "10px" }}>
              <button
                className="addToCartBtn"
                onClick={() => {
                  setIsLoading(true);
                  withdrawnRoyaltyAmount(nft?.tokenId);
                }}
              >
                <span className="buyNowSpan">Withdrawn Amount</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NftBuyAndMakeOffer;
