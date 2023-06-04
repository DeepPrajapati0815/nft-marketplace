import { useContext } from "react";
import axios from "../../../utils/axios";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import ProfileBanner from "./profileBanner/ProfileBanner";
import ProfileImage from "./profileImage/ProfileImage";
import { toast } from "react-hot-toast";

const ProfileBannerAndPhoto = ({ userDetails, setUserDetails }) => {
  const token = localStorage.getItem("token");

  const handleDrop = async (acceptedFile, type) => {
    try {
      const formData = new FormData();
      formData.append("media", acceptedFile[0]);

      const postUrl = "/api/v1/nfts/uploadToIPFS";

      if (
        acceptedFile[0].type.startsWith("image") ||
        acceptedFile[0].type.startsWith("image/gif")
      ) {
        const res = await axios.post(postUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        if (type === "image") {
          setUserDetails({ ...userDetails, image: res?.data?.url });
        }
        if (type === "banner") {
          setUserDetails({ ...userDetails, banner: res?.data?.url });
        }
      } else if (acceptedFile[0].type.startsWith("audio")) {
        toast.error("audio Cant be uploaded");
      } else if (acceptedFile[0].type.startsWith("video")) {
        toast.error("Video Cant be uploaded");
      }
    } catch (error) {
      toast.error("Cant'upload profile Image or banner ");
    }
  };
  return (
    <div className="profileBannerAndPhotoContainer">
      <ProfileBanner handleDrop={handleDrop} userDetails={userDetails} />
      <ProfileImage handleDrop={handleDrop} userDetails={userDetails} />
    </div>
  );
};

export default ProfileBannerAndPhoto;
