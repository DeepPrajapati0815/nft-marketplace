import Dropzone from "react-dropzone";
import ChooseCollection from "../chooseCollection/ChooseCollection";

import axios from "../../../utils/axios";
import { BiCloudUpload } from "react-icons/bi";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import { useContext, useState } from "react";
import Loader from "../../loader/Loader";
import { toast } from "react-hot-toast";

const CreateNftDataCollection = ({
  openCreateCollection,
  setOpenCreateCollection,
  collectionData,
  setCollectionData,

  setMedia,
  setName,
  setFileType,
  setPrice,
  setDescription,
  name,
  fileType,
  media,
  price,
  royalty,
  setRoyalty,
  setRoyaltyRecipient,
  royaltyRecipient,
  description,
}) => {
  const token = localStorage.getItem("token");

  const { createNFT, setIsLoading, isLoading } = useContext(
    NFTMarketplaceContext
  );

  const [isImgLoading, setIsImgLoading] = useState(false);

  const onDrop = async (acceptedFile) => {
    try {
      setIsImgLoading(true);
      const formData = new FormData();
      formData.append("media", acceptedFile[0]);

      const url = await axios.post("/api/v1/nfts/uploadToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      setMedia(url.data.url);
      setIsImgLoading(false);

      if (
        acceptedFile[0].type.startsWith("image") ||
        acceptedFile[0].type.startsWith("image/gif")
      ) {
        setFileType("image");
      } else if (acceptedFile[0].type.startsWith("audio")) {
        setFileType("audio");
      } else if (acceptedFile[0].type.startsWith("video")) {
        setFileType("video");
      }
    } catch (error) {
      toast.error("Cant'upload  Nft try again ");
    }
  };

  return (
    <div className="createNftDataCollection">
      {isImgLoading ? (
        <Loader></Loader>
      ) : (
        <div className="NftImgVidDisplayContainer">
          {fileType === "image" && (
            <img className="NftImgDisplay" src={media} alt="Uploaded " />
          )}
          {fileType === "video" && (
            <video
              className="NftImgDisplay"
              src={media}
              controls
              muted
              autoPlay
            />
          )}
          {fileType === "audio" && (
            <audio controls muted autoPlay>
              <source src={media}></source>
            </audio>
          )}
        </div>
      )}
      <form className="createNftDataCollectionForm">
        <div className="createNftDataCollectionFormItemContainer">
          <label className="dropFileHeading">Choose File</label>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropFileContainer" {...getRootProps()}>
                <input autocomplete="off" required {...getInputProps()} />
                <BiCloudUpload className="dropFileIcon" />
              </div>
            )}
          </Dropzone>
        </div>

        <div className="createNftDataCollectionFormItemContainer">
          <h2 className="createNftDataCollectionFormPriceHeading">NFT Name</h2>
          <input
            autocomplete="off"
            className="createNftDataCollectionFormInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="createNftDataCollectionFormItemContainer">
          <h2 className="createNftDataCollectionFormPriceHeading">
            Description
          </h2>
          <input
            autocomplete="off"
            className="createNftDataCollectionFormInput"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of this container.."
          />
        </div>
        <div className="createNftDataCollectionFormPriceAndRoyaltyContainer">
          <div className="createNftDataCollectionFormItemContainer">
            <h2 className="createNftDataCollectionFormPriceHeading">Price</h2>
            <input
              autocomplete="off"
              className="createNftDataCollectionFormInput"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Eth Amount.."
              required
            />
          </div>

          <div className="createNftDataCollectionFormItemContainer">
            <h2 className="createNftDataCollectionFormPriceHeading">
              Royalty Amount
            </h2>
            <input
              autocomplete="off"
              className="createNftDataCollectionFormInput"
              type="number"
              min={0}
              value={royalty}
              onChange={(e) => setRoyalty(e.target.value)}
              placeholder="%"
            />
          </div>
        </div>
        <div
          className="createNftDataCollectionFormItemContainer"
          style={{ marginBottom: "20px" }}
        >
          <h2 className="createNftDataCollectionFormPriceHeading">
            Royalty recipient
          </h2>
          <input
            autocomplete="off"
            value={royaltyRecipient}
            onChange={(e) => setRoyaltyRecipient(e.target.value)}
            className="createNftDataCollectionFormInput"
            type="text"
            placeholder="Royalty recipient"
          />
        </div>
        <ChooseCollection
          collectionData={collectionData}
          setCollectionData={setCollectionData}
          name={name}
          fileType={fileType}
          media={media}
          price={price}
          description={description}
          createNFT={createNFT}
        />
        <>
          <div className="createNftDataCollectionBtnContainer">
            <button
              className="createNftBtn createNftDataCollectionBtn"
              onClick={() => setOpenCreateCollection(!openCreateCollection)}
            >
              Create Collection
            </button>
          </div>

          <button
            className="createNftBtn"
            onClick={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              await createNFT(
                name,
                price,
                media,
                fileType,
                description,
                royalty,
                royaltyRecipient,
                collectionData
              );
            }}
          >
            Create NFT
          </button>
        </>
      </form>
    </div>
  );
};

export default CreateNftDataCollection;
