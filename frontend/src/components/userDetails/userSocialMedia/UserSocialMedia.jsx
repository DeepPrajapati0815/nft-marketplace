import { BsShare } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import "./userSocialMedia.css";

import { useContext } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const UserSocialMedia = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const { withdrawn, currentAccount } = useContext(NFTMarketplaceContext);

  const handleWithdrwan = async () => {
    await withdrawn();
  };

  return (
    <div className="socialMediaContainerMain">
      <div className="userSocialMediaContainer">
        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <CgWebsite className="userSocialMediaIcons userWebsite" />
          </a>
        </div>

        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <FaInstagram className="userSocialMediaIcons userInstagram" />
          </a>
        </div>

        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <FiTwitter className="userSocialMediaIcons userTwitter" />
          </a>
        </div>

        <div className="userSocialMediaHr"></div>
        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <BsShare className="userSocialMediaIcons userShareIcon" />
          </a>
        </div>

        <div className="socialMediaIconsContainer">
          <div
            className="userSocialMediaLink"
            onClick={() => setOpenSettings(!openSettings)}
          >
            <BiDotsHorizontalRounded className="userSocialMediaIcons userShowMoreIcon" />
          </div>
        </div>
      </div>
      {openSettings && (
        <div className="settingItemContainer">
          <Link
            className="settingItemContainerLink"
            to={"/marketplace/user/edit"}
          >
            <button className="SettingItemBtn">
              <MdEdit></MdEdit> &nbsp; &nbsp; Edit Profile
            </button>
          </Link>

          <button className="SettingItemBtn">
            <AiFillSetting></AiFillSetting> &nbsp; &nbsp; Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSocialMedia;
