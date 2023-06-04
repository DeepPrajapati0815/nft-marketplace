import React, { useEffect, useState } from "react";
import CollectionContainer from "../../components/collectionContainer/CollectionContainer";
import FilterContainer from "../../components/filterContainer/FilterContainer";
import FilterContainerMain from "../../components/filterContainerMain/FilterContainerMain";
import NftCardsContainerMain from "../../components/nftCardsContainerMain/NftCardsContainerMain";
import PageBtnContainer from "../../components/pageBtnContainer/PageBtnContainer";
import SortByContainer from "../../components/sortByContainer/SortByContainer";
// import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./shop.css";

import { useContext } from "react";
import {
  fetchNFTsFromApi,
  handleFilteredNfts,
  handleSortFilter,
} from "../../apiFunctions/nftsApi";
import Loader from "../../components/loader/Loader";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import axios from "../../utils/axios";
// import fetch from "axios";

const Shop = ({ search }) => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);

  const { random, isLoading, setIsLoading } = useContext(NFTMarketplaceContext);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
    category: [],
  });

  const [sort, setSort] = useState(null);
  const [page, onPageChange] = useState(1);

  const [filteredNfts, setFilteredNfts] = useState([]);

  const fetchCollections = async () => {
    try {
      const res = await axios.get("/api/v1/collections");
      setCollections(res?.data?.collections);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNFTsFromApi(page, 30, setIsLoading).then((data) => setNfts(data));
    (async () => {
      await fetchCollections();
    })();
  }, [page, random]);

  const handleSelectCategoryFilter = async () => {
    let myArrayString = encodeURIComponent(JSON.stringify(filter.category));
    const res = await axios.get(
      `/api/v1/collections/getFilteredNfts?categories=${myArrayString}`,
      myArrayString
    );
    return { nfts: res.data?.nfts, collections: res.data?.collections };
  };

  useEffect(() => {
    // handleSearch();
  }, [search]);

  useEffect(() => {
    handleFilteredNfts(filter.minPrice, filter.maxPrice).then((data) =>
      setFilteredNfts(data)
    );

    if (filter.category.length !== 0) {
      handleSelectCategoryFilter().then(({ nfts }) => setFilteredNfts(nfts));
    }
  }, [filter]);

  useEffect(() => {
    handleSortFilter(sort).then((data) => setFilteredNfts(data));
  }, [sort]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="shop">
        <CollectionContainer collections={collections} />

        <div
          style={{
            position: "relative",
          }}
        >
          <SortByContainer
            openSort={openSort}
            sort={sort}
            setSort={setSort}
            setOpenSort={setOpenSort}
          />
          <FilterContainerMain
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <div className="shopContainerFlex">
            {openFilter && (
              <FilterContainer filter={filter} setFilter={setFilter} />
            )}
            <NftCardsContainerMain
              filter={filter}
              nfts={filteredNfts?.length > 0 ? filteredNfts : nfts}
              setNfts={setNfts}
              openFilter={openFilter}
            />
          </div>

          <PageBtnContainer
            page={page}
            onPageChange={onPageChange}
          ></PageBtnContainer>
        </div>
      </div>
    </>
  );
};

export default Shop;
