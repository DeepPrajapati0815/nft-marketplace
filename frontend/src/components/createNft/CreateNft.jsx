import CreateCollectionHeading from "./createCollectionHeading/CreateCollectionHeading";
import CreateNftDataCollection from "./CreateNftDataCollection/CreateNftDataCollection";
import "./createNft.css";
import CreateCollection from "./createCollection/CreateCollection";
import { useContext, useState } from "react";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import Loader from "../loader/Loader";
window.scrollTo(0, 0);
const CreateNft = () => {
  const [openCreateCollection, setOpenCreateCollection] = useState(false);

  const { createNFT, isLoading } = useContext(NFTMarketplaceContext);

  const [media, setMedia] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [royalty, setRoyalty] = useState(0);
  const currentAccount = localStorage.getItem("account");
  const [royaltyRecipient, setRoyaltyRecipient] = useState(currentAccount);

  const [collectionData, setCollectionData] = useState({
    collectionName: "",
    collectionDescription: "",
    image: "",
    banner: "",
    category: "",
    created: false,
  });

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="CreateNftMainContainer">
      <CreateCollectionHeading />
      {openCreateCollection ? (
        <CreateCollection
          setOpenCreateCollection={setOpenCreateCollection}
          collectionData={collectionData}
          setCollectionData={setCollectionData}
          name={name}
          fileType={fileType}
          media={media}
          price={price}
          description={description}
          createNFT={createNFT}
          royalty={royalty}
          setRoyalty={setRoyalty}
          setRoyaltyRecipient={setRoyaltyRecipient}
          royaltyRecipient={royaltyRecipient}
        />
      ) : (
        <CreateNftDataCollection
          collectionData={collectionData}
          openCreateCollection={openCreateCollection}
          setOpenCreateCollection={setOpenCreateCollection}
          setMedia={setMedia}
          setName={setName}
          setFileType={setFileType}
          royalty={royalty}
          setRoyalty={setRoyalty}
          setRoyaltyRecipient={setRoyaltyRecipient}
          royaltyRecipient={royaltyRecipient}
          setPrice={setPrice}
          setCollectionData={setCollectionData}
          setDescription={setDescription}
          name={name}
          fileType={fileType}
          media={media}
          price={price}
          description={description}
          createNFT={createNFT}
        />
      )}
    </div>
  );
};

export default CreateNft;
