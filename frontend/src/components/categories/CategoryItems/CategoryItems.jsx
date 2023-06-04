import React, { useEffect, useState } from "react";

import FilterButton from "../../filterButton/FilterButton";
import FilterContainer from "../../filterContainer/FilterContainer";
import NftCardsContainerMain from "../../nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../sortByContainer/SortByContainer";

const CategoryItems = () => {
  // const [openSort, setOpenSort] = useState(false);
  // const [openFilter, setOpenFilter] = useState(false);

  // const [filter, setFilter] = useState({
  //   minPrice: 0,
  //   maxPrice: 0,
  //   currency: null,
  // });

  // const [sort, setSort] = useState(null);

  // const [categoryFilteredNfts, setCategoryFilteredNfts] = useState([]);

  // const handleFilteredNfts = async (filter) => {
  //   try {
  //     const response = await axios.get(
  //       `/api/v1/nfts/categories/${category}?price[gte]=${filter.minPrice}&price[lte]=${filter.maxPrice}`
  //     );
  //     const data = response?.data?.data;

  //     setCategoryFilteredNfts(data?.nfts);
  //   } catch (error) {}
  // };

  // const handleSortFilter = async (sort) => {
  //   try {
  //     if (sort === "Price: Lowest") {
  //       const response = await axios.get(
  //         `/api/v1/nfts/categories/${category}?sort=price`
  //       );

  //       const data = response?.data?.data;
  //       setCategoryFilteredNfts(data?.nfts);
  //     }
  //     if (sort === "Price: Highest") {
  //       const response = await axios.get(
  //         `/api/v1/nfts/categories/${category}?sort=-price`
  //       );

  //       const data = response?.data?.data;
  //       setCategoryFilteredNfts(data?.nfts);
  //     }
  //     if (sort === "Listed: Recent") {
  //       const response = await axios.get(
  //         `/api/v1/nfts/categories/${category}?sort=-createdAt`
  //       );

  //       const data = response?.data?.data;
  //       setCategoryFilteredNfts(data?.nfts);
  //     }
  //     if (sort === "Listed: Recent") {
  //       const response = await axios.get(
  //         `/api/v1/nfts/categories/${category}?sort=createdAt`
  //       );

  //       const data = response?.data?.data;
  //       setCategoryFilteredNfts(data?.nfts);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   // handleFilteredNfts(filter);
  // }, [filter]);

  // useEffect(() => {
  //   // handleSortFilter(sort);
  // }, [sort]);

  return (
    <div className="filterContainerMain">
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <div className="shop">
          {/* <SortByContainer
            openSort={openSort}
            sort={sort}
            setSort={setSort}
            setOpenSort={setOpenSort}
          /> */}
        </div>
        {/* <FilterButton openFilter={openFilter} setOpenFilter={setOpenFilter} /> */}
        <div className="shopContainerFlex">
          {/* {openFilter && */}
          {/* <FilterContainer filter={filter} setFilter={setFilter} /> */}}
          {/* <NftCardsContainerMain
            filter={filter}
            nfts={collections}
            openFilter={openFilter}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryItems;
