import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import Web3Modal from "web3modal";

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./contanst";
import { useNavigate } from "react-router-dom";
import { generateAuthToken } from "../utils/generateToken";

export const NFTMarketplaceContext = createContext();

const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmBox, setShowConfirmBox] = useState({
    open: false,
    type: "",
    action: null,
  });

  const [random, setRandom] = useState(0);
  const [royaltyBalance, setRoyaltyBalance] = useState(0);

  const navigate = useNavigate();

  const getProvider = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    return provider;
  };

  const getSigner = async () => {
    const provider = await getProvider();
    const signer = provider.getSigner();

    return signer;
  };

  // fetch Contract
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      NFTMarketplaceAddress,
      NFTMarketplaceABI,
      signerOrProvider
    );

  //connecting to smart contract

  const connectingWithSmartContract = async () => {
    try {
      const provider = await getProvider();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      return contract;
    } catch (error) {
      toast.error("Internal Server Error!");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("install metamask");
        setTimeout(() => {
          window.location.href = "https://metamask.io/";
        }, 1000);
      } else {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const signer = await getSigner();
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);

          const token = await generateAuthToken(signer, accounts[0]);

          await axios.post(
            "/api/v1/users",
            {
              account: accounts[0],
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          localStorage.setItem("account", accounts[0]);
          localStorage.setItem("token", token);
        }

        toast.success("Wallet Connected!");
        navigate(window.location.pathname);
      }
    } catch (error) {
      toast.error("wallet can't connect");
    }
  };

  const createNFT = async (
    name,
    price,
    media,
    fileType,
    description,
    royalty,
    royaltyRecipient,
    collectionData
  ) => {
    try {
      if (!name && !description && !media && !fileType && !price) {
        toast.error("Missing required fields!");
      }

      const data = {
        name,
        description,
        media,
        fileType,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post("/api/v1/nfts/uploadNFT", data, {
        headers: {
          Authorization: token,
        },
      });

      const url = response.data.url;

      if (url) {
        await createSale(
          url,
          price,
          name,
          royalty,
          royaltyRecipient,
          false,
          0,
          collectionData
        );
      }
    } catch (error) {
      toast.error("Missing required felids");
    }
  };

  const withdrawn = async () => {
    const contract = await connectingWithSmartContract();
    const res = await contract.getContractBalance();
    // const balance = ethers.utils.formatUnits(res, "ether");
    // const result = await contract.withdrawn();
  };

  const getRoyaltyBalance = async (tokenId) => {
    const contract = await connectingWithSmartContract();
    const res = await contract.getRoyaltyAmountOfRecipient(tokenId);
    const balance = ethers.utils.formatUnits(res, "ether");
    setRoyaltyBalance(balance);
  };

  const withdrawnRoyaltyAmount = async (tokenId) => {
    const contract = await connectingWithSmartContract();
    const transaction = await contract.withdrawnRoyalty(tokenId);
    await transaction.wait();
    setIsLoading(false);
  };

  const createSale = async (
    url,
    formInputPrice,
    name,
    royalty,
    royaltyRecipient,
    isReselling,
    id,
    collectionData
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (isReselling === false) {
        const contract = await connectingWithSmartContract();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");

        const listingPrice = await contract.getListingPrice();

        const transaction = await contract.createToken(
          url,
          price,
          royalty,
          royaltyRecipient,
          {
            value: listingPrice.toString(),
          }
        );

        let collectionId = "";

        if (
          collectionData.collectionName !== "" &&
          !collectionData.collectionDescription !== "" &&
          !collectionData.image !== "" &&
          !collectionData.banner !== ""
        ) {
          if (collectionData?.created === false) {
            const res = await axios.post(
              "/api/v1/collections",
              {
                ...collectionData,
                creator: currentAccount?.toLowerCase(),
              },
              {
                headers: { Authorization: token },
              }
            );

            collectionId = res?.data?.data?._id;
          } else {
            collectionId = collectionData?._id;
          }
        }
        contract.once(
          "MarketItemCreated",
          async (
            tokenId,
            seller,
            owner,
            price,
            sold,
            creator,
            royaltyRecipient,
            royalty
          ) => {
            const data = {
              name,
              tokenURI: url,
              tokenId: Number(String(tokenId)),
              seller,
              owner,
              price: Number(String(ethers.utils.formatUnits(price, "ether"))),
              sold,
              collectionId,
              creator,
              royaltyRecipient,
              royalty: Number(royalty.toString()),
            };

            const res = await axios.post("/api/v1/nfts", data, {
              headers: { Authorization: token },
            });

            // const nftData = res.data.data.nft;

            // await axios.post(
            //   "/api/v1/nfts/update/logs",
            //   { ...nftData, status: "minted" },
            //   {
            //     headers: { Authorization: token },
            //   }
            // );
          }
        );
        await transaction.wait();
        toast.success("NFT Created Successful!");
        setIsLoading(false);
        navigate("/marketplace/user");
      } else {
        const contract = await connectingWithSmartContract();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");

        const listingPrice = await contract.getListingPrice();

        const transaction = await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

        contract.once("resellEvent", async (tokenId, seller, owner, price) => {
          const data = {
            tokenId: Number(String(tokenId)),
            seller,
            owner,
            sold: false,
            price: Number(String(ethers.utils.formatUnits(price, "ether"))),
            status: "resell",
          };

          const res = await axios.patch(`/api/v1/nfts/${tokenId}`, data, {
            headers: {
              Authorization: token,
            },
          });
        });

        await transaction.wait();

        setIsLoading(false);
        toast.success("NFT Resell Successful!");

        navigate("/marketplace/user");
      }
    } catch (error) {
      if (isReselling) {
        toast.error(error.message.slice(0, 50));
        setIsLoading(false);
      } else {
        toast.error(error.message.slice(0, 50));
        setIsLoading(false);
      }
    }
  };

  //buy NFTs function
  const buyNft = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      contract.once("buyEvent", async (tokenId, seller, owner) => {
        const data = {
          tokenId: Number(String(tokenId)),
          seller: seller?.toLowerCase(),
          owner: owner?.toLowerCase(),
          price: nft.price,
          sold: true,
          status: "buy",
        };

        const token = localStorage.getItem("token");

        const res = await axios.patch(`/api/v1/nfts/${tokenId}`, data, {
          headers: { Authorization: token },
        });
      });

      await transaction.wait();

      setIsLoading(false);
      toast.success("NFT Purchased Successfully");
      navigate("/marketplace/user");
    } catch (error) {
      toast.error(error.message.slice(0, 50));
      setIsLoading(false);
    }
  };

  return (
    <>
      <NFTMarketplaceContext.Provider
        value={{
          currentAccount,
          showConfirmBox,
          isLoading,
          random,
          royaltyBalance,
          connectingWithSmartContract,
          connectWallet,
          createNFT,
          setShowConfirmBox,
          createSale,
          setCurrentAccount,
          buyNft,
          withdrawn,
          getRoyaltyBalance,
          setIsLoading,
          withdrawnRoyaltyAmount,
          setRandom,
        }}
      >
        {children}
      </NFTMarketplaceContext.Provider>
    </>
  );
};

export default NFTMarketplaceProvider;
