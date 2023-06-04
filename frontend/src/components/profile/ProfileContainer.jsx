import "./profileContainer.css";
import ProfileForm from "./profileForm/ProfileForm";
import ProfileBannerAndPhoto from "./profileBannerAndPhoto/ProfileBannerAndPhoto";
import { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import axios from "../../utils/axios";

const ProfileContainer = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    bio: "",
    image: "",
    banner: "",
    email: "",
  });

  const { currentAccount } = useContext(NFTMarketplaceContext);
  const token = localStorage.getItem("token");

  const fetchUserDetails = async () => {
    const res = await axios.get(
      "/api/v1/users/" + currentAccount?.toLowerCase(),
      { headers: { Authorization: token } }
    );
    if (res.status === 200) {
      const user = res.data?.user;

      setUserDetails({
        username: user.username,
        bio: user.bio,
        image: user.image,
        email: user.email,
        banner: user.banner,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserDetails();
    })();
  }, []);

  return (
    <>
      <ProfileBannerAndPhoto
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <div className="profileContainer">
        <ProfileForm
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      </div>
    </>
  );
};

export default ProfileContainer;
