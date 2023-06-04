import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdModeEdit } from "react-icons/md";
import "./profileImage.css";

const ProfileImage = ({ userDetails, handleDrop }) => {
  const onDrop = useCallback(async (acceptedFile) => {
    handleDrop(acceptedFile, "image");
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image,gif,avif",
    onDrop,
  });

  return (
    <div className="profileImageContainer" {...getRootProps()}>
      <input type={"hidden"} {...getInputProps()}></input>
      <img
        className="profileImage"
        alt=""
        src={
          userDetails.image
            ? userDetails.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
      />
      <div className="profileImageEditIconContainer">
        <MdModeEdit className="profileImageEditIcon" />
      </div>
    </div>
  );
};

export default ProfileImage;
