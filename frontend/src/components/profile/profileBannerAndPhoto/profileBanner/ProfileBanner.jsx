import "./profileBanner.css";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const ProfileBanner = ({ handleDrop, userDetails }) => {
  const onDrop = useCallback(async (acceptedFile) => {
    handleDrop(acceptedFile, "banner");
  });

  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image,gif,avif",
    onDrop,
  });

  return (
    <div
      className="profileBannerContainer"
      {...getRootProps()}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <input type={"hidden"} {...getInputProps()}></input>
      <img
        className="profileBanner"
        src={
          userDetails.banner
            ? userDetails.banner
            : "https://img.freepik.com/free-vector/nft-non-fungible-tokens-crypto-art-blue-abstract-background_1419-2248.jpg"
        }
        alt=""
      />
      <div className="profileBannerEditIconContainer">
        {hovered ? <MdModeEdit className="profileBannerEditIcon" /> : null}
      </div>
    </div>
  );
};

export default ProfileBanner;
