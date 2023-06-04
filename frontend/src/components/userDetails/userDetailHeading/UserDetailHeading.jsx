import { useContext } from "react";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import "./userDetailHeading.css";

const UserDetailHeading = ({ userDetails }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  return (
    <div className="userDetailHeadingContainer">
      <h3 className="userDetailHeading">
        {currentAccount?.slice(0, 7) + "...." + currentAccount?.slice(30)}
      </h3>
      <h4
        className="userDetailHeading"
        style={{ marginTop: "5px", fontSize: "16px" }}
      >
        {userDetails?.username}
      </h4>
    </div>
  );
};

export default UserDetailHeading;
