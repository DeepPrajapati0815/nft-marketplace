import { useContext, useEffect, useState } from "react";
import UserBannerAndProfile from "./userBannerAndProfile/UserBannerAndProfile";
import UserBio from "./userBio/UserBio";
import UserDetailHeading from "./userDetailHeading/UserDetailHeading";
import UserDetailJoiningDate from "./userDetailJoiningDate/UserDetailJoiningDate";
import UserNftCollectionAndCreationBtnContainer from "./userNftCollectionAndCreationBtnContainer/UserNftCollectionAndCreationBtnContainer";
import UserNftCollectionContainer from "./userNftCollectionContainer/UserNftCollectionContainer";
import Loader from "../../components/loader/Loader";
import UserSocialMedia from "./userSocialMedia/UserSocialMedia";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

import axios from "../../utils/axios";

const UserDetails = ({ search }) => {
  const [active, setActive] = useState(1);

  const [userDetails, setUserDetails] = useState(null);

  const [collected, setCollected] = useState([]);

  const [created, setCreated] = useState([]);

  const [royalties, setRoyalties] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [collections, setCollections] = useState([]);

  const [filteredCollections, setFilteredCollections] = useState([]);

  const { currentAccount, random, isLoading, setIsLoading } = useContext(
    NFTMarketplaceContext
  );

  const token = localStorage.getItem("token");

  const fetchUserCollections = async () => {
    try {
      const res = await axios.get(
        "/api/v1/collections/user/" + currentAccount?.toLowerCase(),
        { headers: { Authorization: token } }
      );

      setCollections(res.data?.collections);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserDetails();
      await fetchUserCollections();
    })();
  }, [random]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        "/api/v1/users/" + currentAccount?.toLowerCase(),
        { headers: { Authorization: token } }
      );
      setUserDetails(res.data?.user);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchUserDetails();
      await fetchUserCollections();
      setIsLoading(false);
    })();
  }, [currentAccount, active]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="UserDetailsContainerMain">
      <UserBannerAndProfile userDetails={userDetails} />
      <UserDetailHeading userDetails={userDetails} />
      <UserSocialMedia userDetails={userDetails} />
      <UserDetailJoiningDate userDetails={userDetails} />
      <UserBio userDetails={userDetails} />
      <UserNftCollectionAndCreationBtnContainer
        active={active}
        created={created.length}
        royalties={royalties.length}
        collected={collected.length}
        favorites={favorites.length}
        collections={collections.length}
        setActive={setActive}
      />

      <UserNftCollectionContainer
        collected={collected}
        setCollected={setCollected}
        created={created}
        setCreated={setCreated}
        royalties={royalties}
        setRoyalties={setRoyalties}
        favorites={favorites}
        setFavorites={setFavorites}
        collections={collections}
        setCollections={setCollections}
        setFilteredCollections={setFilteredCollections}
        filteredCollections={filteredCollections}
        search={search}
        active={active}
      />
    </div>
  );
};

export default UserDetails;
