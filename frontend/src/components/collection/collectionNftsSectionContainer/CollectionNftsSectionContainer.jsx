import axios from "../../../utils/axios";
import { useContext, useEffect, useState } from "react";
import FilterButton from "../../filterButton/FilterButton";
import FilterContainer from "../../filterContainer/FilterContainer";
import NftCardsContainerMain from "../../nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../sortByContainer/SortByContainer";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const CollectionNftsSectionContainer = ({
  filteredNfts,
  nfts,
  setSort,
  sort,
  setFilter,
  filter,
  openSort,
  openFilter,
  setOpenFilter,
  setOpenSort,
}) => {
  return (
    <div className="filterContainerMain">
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <div className="shop">
          <SortByContainer
            openSort={openSort}
            sort={sort}
            setSort={setSort}
            setOpenSort={setOpenSort}
          />
        </div>
        <FilterButton openFilter={openFilter} setOpenFilter={setOpenFilter} />
        <div className="shopContainerFlex">
          {openFilter && (
            <FilterContainer filter={filter} setFilter={setFilter} />
          )}

          <NftCardsContainerMain
            filter={filter}
            nfts={nfts}
            openFilter={openFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionNftsSectionContainer;
