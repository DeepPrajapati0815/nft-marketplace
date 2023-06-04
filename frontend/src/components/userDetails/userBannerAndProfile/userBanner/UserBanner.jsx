import "./userBanner.css";

const UserBanner = ({ userDetails }) => {
  return (
    <div className="userBannerContainer">
      <img
        className="userBannerImage"
        src={
          userDetails?.banner
            ? userDetails.banner
            : "https://img.freepik.com/free-vector/nft-non-fungible-tokens-crypto-art-blue-abstract-background_1419-2248.jpg"
        }
        alt=""
      />
    </div>
  );
};
// https://cdn.shopify.com/s/files/1/1905/9639/files/lucent_logo.svg?v=1641550748
export default UserBanner;
