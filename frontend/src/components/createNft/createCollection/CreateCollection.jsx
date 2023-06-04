import { useContext, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";

import { BiCloudUpload } from "react-icons/bi";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";
import Loader from "../../loader/Loader";
import "./createCollection.css";

const CreateCollection = ({
  setOpenCreateCollection,
  collectionData,
  setCollectionData,
  name,
  fileType,
  media,
  price,
  description,
  createNFT,
  royalty,
  setRoyalty,
  setRoyaltyRecipient,
  royaltyRecipient,
}) => {
  const { setIsLoading, isLoading } = useContext(NFTMarketplaceContext);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const token = localStorage.getItem("token");
  window.scrollTo(0, 0);
  const handleDrop = async (acceptedFile, type) => {
    try {
      setIsImgLoading(true);
      const formData = new FormData();
      formData.append("media", acceptedFile[0]);
      const postUrl = "/api/v1/nfts/uploadToIPFS";

      if (
        acceptedFile[0].type.startsWith("image") ||
        acceptedFile[0].type.startsWith("image/gif")
      ) {
        const res = await axios.post(postUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        if (type === "image") {
          setCollectionData({ ...collectionData, image: res?.data?.url });
        }
        if (type === "banner") {
          setCollectionData({ ...collectionData, banner: res?.data?.url });
        }
      } else if (acceptedFile[0].type.startsWith("audio")) {
        toast.error("audio Cant be uploaded");
      } else if (acceptedFile[0].type.startsWith("video")) {
        toast.error("Video Cant be uploaded");
      }

      setIsImgLoading(false);
    } catch (error) {
      toast.error("Cant'upload  Nft try again ");
    }
  };

  return (
    <>
      <div className="createCollectionContainerMain">
        <div className="createCollectionContainer">
          <form action="" className="createNftDataCollectionForm">
            <div className="createCollectionHeadingContainer">
              <h1 className="createCollectionHeading">Create Collection</h1>
            </div>
            <div className="createCollectionInputContainer">
              {isImgLoading ? (
                <Loader></Loader>
              ) : collectionData.image !== "" ? (
                <div>
                  <label className="dropFileHeading">Choose Image</label>
                  <Dropzone
                    onDrop={(acceptedFile) => handleDrop(acceptedFile, "image")}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropFileContainer" {...getRootProps()}>
                        {collectionData.image && (
                          <>
                            <input
                              autocomplete="off"
                              required
                              {...getInputProps()}
                            />
                            <img
                              className="NftImgDisplay"
                              src={collectionData.image}
                              alt="Uploaded "
                            />
                          </>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              ) : (
                <div className="createNftDataCollectionFormItemContainer">
                  <label className="dropFileHeading">Choose Image</label>
                  <Dropzone
                    onDrop={(acceptedFile) => handleDrop(acceptedFile, "image")}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropFileContainer" {...getRootProps()}>
                        <input
                          autocomplete="off"
                          required
                          {...getInputProps()}
                        />
                        <BiCloudUpload className="dropFileIcon" />
                      </div>
                    )}
                  </Dropzone>
                </div>
              )}
              {collectionData.banner !== "" ? (
                <div>
                  <label className="dropFileHeading">Choose Banner</label>

                  <Dropzone
                    onDrop={(acceptedFile) =>
                      handleDrop(acceptedFile, "banner")
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="dropFileBannerContainer "
                        {...getRootProps()}
                      >
                        <input
                          autocomplete="off"
                          required
                          {...getInputProps()}
                        />
                        {collectionData.banner && (
                          <img
                            className="NftBannerDisplay"
                            src={collectionData.banner}
                            alt="Uploaded "
                          />
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              ) : (
                <div className="createNftDataCollectionFormItemContainer">
                  <label className="dropFileHeading">Choose Banner</label>

                  <Dropzone
                    onDrop={(acceptedFile) =>
                      handleDrop(acceptedFile, "banner")
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="dropFileBannerContainer"
                        {...getRootProps()}
                      >
                        <input
                          autocomplete="off"
                          required
                          {...getInputProps()}
                        />

                        <BiCloudUpload className="dropFileIcon" />
                      </div>
                    )}
                  </Dropzone>
                </div>
              )}
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Collection Name
                </h2>
                <input
                  autocomplete="off"
                  className="createNftDataCollectionFormInput"
                  type="text"
                  placeholder="Enter Collection Name.."
                  required
                  value={collectionData.collectionName}
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      collectionName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Category Name
                </h2>
                <select
                  required
                  className="createNftDataCollectionFormInput"
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="" className="createNftDataCollectionOption">
                    -- Select Category --
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"art"}
                  >
                    Art
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"music"}
                  >
                    Music
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"video"}
                  >
                    Video
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"fashion"}
                  >
                    Fashion
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"sports"}
                  >
                    Sports
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"photography"}
                  >
                    Photography
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"collectibles"}
                  >
                    Collectibles
                  </option>
                </select>
              </div>
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Collection description
                </h2>
                <input
                  autocomplete="off"
                  className="createNftDataCollectionFormInput"
                  type="text"
                  required
                  placeholder="Enter Collection Description.."
                  value={collectionData.collectionDescription}
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      collectionDescription: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="createNftBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  createNFT(
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
              &nbsp; &nbsp;
              <button
                className="createNftBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setCollectionData({
                    collectionName: "",
                    collectionDescription: "",
                    image: "",
                  });
                  setOpenCreateCollection(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;
