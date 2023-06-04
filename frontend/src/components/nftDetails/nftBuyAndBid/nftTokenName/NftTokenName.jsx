import "./nftTokenName.css";

const NftTokenName = ({ nft }) => {
  return (
    <div className="nftTokenNameContainer">
      <h1 className="nftTokenName">#{nft?.name}</h1>
    </div>
  );
};

export default NftTokenName;
