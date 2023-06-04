import React from "react";
import UserBanner from "./userBanner/UserBanner";
import UserProfile from "./userProfile/UserProfile";

const UserBannerAndProfile = ({ userDetails }) => {
  return (
    <div className="userBannerAndProfileContainer">
      <UserBanner userDetails={userDetails} />
      <UserProfile userDetails={userDetails} />
    </div>
  );
};

export default UserBannerAndProfile;
