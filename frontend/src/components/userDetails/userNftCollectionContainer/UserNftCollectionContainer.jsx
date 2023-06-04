import { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";
import CategoriesCardContainer from "../../categories/categoriesCardContainer/CategoriesCardContainer";
import FilterButton from "../../filterButton/FilterButton";
import FilterContainer from "../../filterContainer/FilterContainer";
import NftCardsContainerMain from "../../nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../sortByContainer/SortByContainer";

const UserNftCollectionContainer = ({
  active,
  search,
  created,
  setCollected,
  filteredCollections,
  isPublised,
  royalties,
  setRoyalties,
  setIsPublished,
  setCreated,
  setFilteredCollections,
  collected,
  favorites,
  setFavorites,
  collections,
}) => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { currentAccount, random } = useContext(NFTMarketplaceContext);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
    category: [],
  });

  const handleSelectCategoryFilter = async () => {
    let myArrayString = encodeURIComponent(JSON.stringify(filter.category));
    const res = await axios.get(
      `/api/v1/collections/getFilteredNftsOfUser/${currentAccount?.toLowerCase()}?categories=${myArrayString}`,
      myArrayString
    );
    const data = res.data;
    setCollectedFilteredNfts(data?.collected);

    setFavoriteFilteredNfts(data?.favorites);
    setCreatedFilteredNfts(data?.created);
    setFilteredCollections(data?.collections);
  };

  const token = localStorage.getItem("token");
  const [sort, setSort] = useState(null);

  const [collectedFilteredNfts, setCollectedFilteredNfts] = useState([]);
  const [createdFilteredNfts, setCreatedFilteredNfts] = useState([]);
  const [favoriteFilteredNfts, setFavoriteFilteredNfts] = useState([]);
  const [royaltiesFilteredNfts, setRoyaltiesFilteredNfts] = useState([]);

  const fetchUsersNFTsFromApi = async (currentAccount) => {
    const response = await axios.get(
      `/api/v1/nfts/user/${currentAccount?.toLowerCase()}`,
      { headers: { Authorization: token } }
    );
    const data = response?.data?.data;
    setCollected(data?.nftsCollected);
    setCreated(data?.nftsCreated);
    setRoyalties(data?.royalties);
    setFavorites(data?.favorites);
  };

  const handleFilteredNfts = async (filter) => {
    const response = await axios.get(
      `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?price[gte]=${
        filter.minPrice
      }&price[lte]=${filter.maxPrice}`,
      { headers: { Authorization: token } }
    );

    const data = response?.data?.data;

    setCollectedFilteredNfts(data?.nftsCollected);
    setCreatedFilteredNfts(data?.nftsCreated);

    setRoyaltiesFilteredNfts(data?.royalties);
    setFavoriteFilteredNfts(data?.favorites);
  };

  const handleSortFilter = async (sort) => {
    try {
      if (sort === "Price: Lowest") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=price`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);
        setRoyaltiesFilteredNfts(data?.royalties);
        setFavoriteFilteredNfts(data?.favorites);
      }
      if (sort === "Price: Highest") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=-price`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setCollectedFilteredNfts(data?.nftsCollected);

        setRoyaltiesFilteredNfts(data?.royalties);
        setFavoriteFilteredNfts(data?.favorites);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=-createdAt`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setRoyaltiesFilteredNfts(data?.royalties);
        setFavoriteFilteredNfts(data?.favorites);
        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=createdAt`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setRoyaltiesFilteredNfts(data?.royalties);
        setFavoriteFilteredNfts(data?.favorites);
        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsersNFTsFromApi(currentAccount);
  }, [currentAccount, active, random]);

  useEffect(() => {
    (async () => {
      await handleFilteredNfts(filter);
      await handleSelectCategoryFilter();
    })();
  }, [filter]);

  useEffect(() => {
    handleSortFilter(sort);
  }, [sort]);

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
          {active !== 5 && (
            <NftCardsContainerMain
              filter={filter}
              nfts={
                collectedFilteredNfts?.length > 0 ||
                createdFilteredNfts?.length > 0 ||
                royaltiesFilteredNfts?.length > 0 ||
                favoriteFilteredNfts?.length > 0
                  ? active === 1
                    ? collectedFilteredNfts
                    : active === 2
                    ? createdFilteredNfts
                    : active === 3
                    ? royaltiesFilteredNfts
                    : favoriteFilteredNfts
                  : active === 1
                  ? collected
                  : active === 2
                  ? created
                  : active === 3
                  ? royalties
                  : favorites
              }
              openFilter={openFilter}
            />
          )}

          {collections.length > 0 && active === 5 && (
            <CategoriesCardContainer
              collections={
                filteredCollections?.length > 0
                  ? filteredCollections
                  : collections
              }
              currentAccount={currentAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNftCollectionContainer;
