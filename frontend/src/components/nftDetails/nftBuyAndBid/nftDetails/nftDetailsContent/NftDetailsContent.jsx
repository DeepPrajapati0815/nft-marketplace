import "./nftDetailsContent.css";

const NftDetailsContent = ({ nft }) => {
  return (
    <div className="nftDetailsContentContainer">
      <p className="nftDetailsContent">
        {/* 2555 hand-picked AI landscape images of a unique collaboration between
        Cath , Ryan and Artificial Intelligence, bridging the natural and the
        supernatural. */}
        {nft?.description}
      </p>
    </div>
  );
};

export default NftDetailsContent;
