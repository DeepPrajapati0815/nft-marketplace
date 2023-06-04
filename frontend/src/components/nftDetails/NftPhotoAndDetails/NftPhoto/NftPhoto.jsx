import "./nftPhoto.css";

const NftPhoto = ({ nft }) => {
  return (
    <div className="nftPhotoContainer">
      {nft?.fileType === "image" && (
        <img
          className="nftPhoto"
          src={nft?.media}
          alt="Could not load img here!!"
        />
      )}
      {nft?.fileType === "audio" && (
        <audio controls muted>
          <source src={nft?.media}></source>
        </audio>
      )}
      {nft?.fileType === "video" && (
        <video src={nft?.media} className="nftPhoto" controls autoPlay muted />
      )}
    </div>
  );
};

export default NftPhoto;
