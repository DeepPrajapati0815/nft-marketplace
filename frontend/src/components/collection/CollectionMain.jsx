import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CollectionBannerAndImage from "./collectionBannerAndImage/CollectionBannerAndImage";
import CollectionDescription from "./collectionDescription/CollectionDescription";
import CollectionHeading from "./collectionHeading/CollectionHeading";
import CollectionItems from "./collectionItems/CollectionItems";
import axios from "../../utils/axios";
import CollectionOwner from "./collectionOwner/CollectionOwner";
import CollectionSpecification from "./collectionSpecification/CollectionSpecification";
import CollectionNftsSectionContainer from "./collectionNftsSectionContainer/CollectionNftsSectionContainer";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import Loader from "../loader/Loader";

const CollectionMain = ({ search }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(null);

  const [filteredNfts, setFilteredNfts] = useState([]);

  const { random, setIsLoading, isLoading } = useContext(NFTMarketplaceContext);

  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
    category: [],
  });

  const account = searchParams.get("account");

  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [stats, setStats] = useState({ total: 0, avg: 0, owners: 0 });

  const fetchSingleCollection = async () => {
    try {
      const res = await axios.get(
        `/api/v1/collections/${id}?${account && "account=" + account}`
      );

      const total = res?.data?.total[0];

      setCollection(res?.data?.collection);
      setNfts(res?.data?.nfts);
      setStats({
        total: total?.TotalAmount,
        avg: total?.avg,
        owners: total?.owners,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleFilteredNfts = async (filter) => {
    const response = await axios.get(
      `/api/v1/collections/${id}?price[gte]=${filter.minPrice}&price[lte]=${filter.maxPrice}`
    );

    const data = response?.data?.nfts;
    setFilteredNfts(data);
  };

  const handleSelectCategoryFilter = async () => {
    let myArrayString = encodeURIComponent(JSON.stringify(filter.category));
    const res = await axios.get(
      `/api/v1/collections/getFilteredNfts?categories=${myArrayString}`,
      myArrayString
    );
    return { nfts: res.data?.nfts, collections: res.data?.collections };
  };

  const handleSortFilter = async (sort) => {
    try {
      if (sort === "Price: Lowest") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=price`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Price: Highest") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=-price`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=-createdAt`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=createdAt`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchSingleCollection();
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      await fetchSingleCollection();
    })();
  }, [random]);

  useEffect(() => {
    handleFilteredNfts(filter);

    if (filter.category.length !== 0) {
      handleSelectCategoryFilter().then(({ nfts }) => setFilteredNfts(nfts));
    }
  }, [filter]);

  useEffect(() => {
    handleSortFilter(sort);
  }, [sort]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="collectionMain">
      <CollectionBannerAndImage collection={collection} />
      <CollectionHeading collection={collection} />
      <CollectionOwner collection={collection} />
      <CollectionDescription collection={collection} />
      <CollectionItems collection={collection} nfts={nfts} />
      <CollectionSpecification stats={stats} />
      <CollectionNftsSectionContainer
        setOpenSort={setOpenSort}
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        openSort={openSort}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        nfts={filteredNfts?.length > 0 ? filteredNfts : nfts}
        filteredNfts={filteredNfts}
      />
    </div>
  );
};

export default CollectionMain;
