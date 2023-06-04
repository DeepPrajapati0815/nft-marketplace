import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { BsPlay, BsPause } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./nftAudioCard.css";

const NftAudioCard = ({ nft, filter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.currentTime = currentTime;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    setCurrentTime(audioRef.current.currentTime);
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const [price, setPrice] = useState(nft?.price + " ETH ");

  const fetchCurrentPriceOfEth = async () => {
    try {
      if (filter.currency === "INR") {
        const inrPrice = await axios.get(
          "https://api.coinconvert.net/convert/eth/inr?amount=" + nft?.price
        );
        setPrice("₹ " + Math.floor(inrPrice.data.INR) + " INR ");
      } else if (filter.currency === "USD") {
        const usdPrice = await axios.get(
          "https://api.coinconvert.net/convert/eth/usd?amount=" + nft?.price
        );

        setPrice("$ " + usdPrice.data.USD + " USD ");
      } else {
        setPrice(nft?.price + " ETH ");
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCurrentPriceOfEth();
  });

  return (
    <>
      <div className="nftAudioCard">
        <div className="nftCardAudioContainerMain">
          <div className="nftCardAudioContainer">
            <audio ref={audioRef} src={nft.media} />
            <button
              className="playPauseBtn"
              onClick={isPlaying ? handlePause : handlePlay}
            >
              {isPlaying ? (
                <BsPause className="nftAudioCardPlayPauseIcon" />
              ) : (
                <BsPlay className="nftAudioCardPlayPauseIcon" />
              )}
            </button>
          </div>
          <Link
            style={{ textDecoration: "none" }}
            to={`/marketplace/nft/${nft._id}`}
          >
            <div className="nftCardContent">
              <div className="nftCardAuthorNameContainer">
                <p className="nftCardAuthorName">
                  {nft.seller.slice(0, 7) + "..." + nft.seller.slice(37)}
                </p>
                <TiTick className="nftAuthorVerificationImg" />
              </div>
              <div className="nftCardNameContainer">
                <h3 className="nftCardName">{nft.name}</h3>
              </div>

              <div className="nftCardPriceAndBuyContainer">
                <div className="nftCardPriceContainer">
                  <p className="nftCardPrice">{price}</p>
                </div>
                <div className="nftCardBuyContainer">
                  <button className="nftCardBuyBtn">Buy</button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NftAudioCard;
