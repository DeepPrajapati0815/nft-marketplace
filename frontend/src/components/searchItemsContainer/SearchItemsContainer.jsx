import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./searchItemsContainer.css";

const SearchItemsContainer = ({ collections, nfts }) => {
  const naviagte = useNavigate();
  return (
    <div className="searchItemsContainer">
      {collections?.length > 0 ? (
        <div>
          <h5 className="searchItemsContainerHeading">Collectinons</h5>
          <div className="searchItem">
            {collections.map((collection, i) => (
              <div
                key={i}
                className="SearchSingleItem"
                onClick={() => {
                  naviagte(`/marketplace/collection/${collection?._id}`);
                }}
              >
                <div className="searchItemImageContainer">
                  <img
                    className="searchItemImage"
                    src={collection?.image}
                    alt="Could not load img here!!"
                  ></img>
                </div>
                <p key={i}>{collection?.collectionName}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div
            className="searchItem"
            style={{
              color: "gray",
              textAlign: "center",
            }}
          >
            <p>No Result Found!</p>
          </div>
        </div>
      )}

      {nfts?.length > 0 && (
        <div>
          <h5 className="searchItemsContainerHeading">Nfts</h5>
          <div className="searchItem">
            {nfts.map((nft, i) => (
              <div
                key={i}
                className="SearchSingleItem"
                onClick={() => {
                  naviagte(`/marketplace/nft/${nft?._id}`);
                }}
              >
                <div className="searchItemImageContainer">
                  <img
                    className="searchItemImage"
                    src={nft?.media}
                    alt="Could not load img here!!"
                  />
                </div>
                <p key={i}>{nft?.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchItemsContainer;
