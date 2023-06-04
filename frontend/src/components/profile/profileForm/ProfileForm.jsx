import { useContext } from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import ProfileHeading from "../profileHeading/ProfileHeading";
import axios from "../../../utils/axios";
import "./profileForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProfileForm = ({ userDetails, setUserDetails }) => {
  const token = localStorage.getItem("token");

  const { currentAccount } = useContext(NFTMarketplaceContext);
  const navigate = useNavigate();

  const handleProfile = async () => {
    try {
      await axios.patch(
        "/api/v1/users/" + currentAccount.toLowerCase(),
        { ...userDetails, account: currentAccount.toLowerCase() },
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Profile updated Successfully!");
      navigate("/marketplace/user");
    } catch (error) {}
  };

  return (
    <>
      <div className="profileFormContainerMain">
        <ProfileHeading />
        <hr />
        <div className="profileFormContainer">
          <div className="profileFormItemHeadingContainer">
            <p className="profileFormItemHeading">Username</p>
          </div>
          <div className="profileFormContainerInputContainer">
            <input
              autocomplete="off"
              type="text"
              placeholder="Username..."
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              className="profileFormContainerInput"
            />
          </div>
        </div>

        <div className="profileFormContainer">
          <div className="profileFormItemHeadingContainer">
            <p className="profileFormItemHeading">Bio</p>
          </div>
          <div className="profileFormContainerInputContainer">
            <textarea
              className="profileFormContainerInput"
              name="profileFormContainerInput"
              placeholder="Bio..."
              id=""
              value={userDetails.bio}
              onChange={(e) =>
                setUserDetails({ ...userDetails, bio: e.target.value })
              }
              cols="21"
              rows="5"
            ></textarea>
          </div>
        </div>

        <div className="profileFormContainer">
          <div className="profileFormItemHeadingContainer">
            <p className="profileFormItemHeading">Email</p>
          </div>
          <div className="profileFormContainerInputContainer">
            <input
              autocomplete="off"
              type="email"
              name=""
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              placeholder="Email..."
              className="profileFormContainerInput"
              id=""
            />
          </div>
        </div>

        <hr style={{ margin: "15px 0px" }} />

        <div className="profileFormContainer profileFormSocialItemMainContainer">
          <div className="profileFormItemHeadingContainer">
            <p className="profileFormItemHeading">Social Connection</p>
          </div>
          <div className="profileFormSocialConnectionParaContainer">
            <p className="profileFormSocialConnectionPara">
              Help collectors verify your account by connecting social accounts.
            </p>
          </div>

          <div className="profileFormSocialConnectionIconAndBtnContainerMain">
            <div className="profileFormSocialConnectionIconAndBtnContainer">
              <div className="profileFormSocialConnectionIconContainer">
                <FaTwitter className="profileFormSocialConnectionIcon" />
              </div>
              <div className="profileFormSocialConnectionNameContainer">
                <p className="profileFormSocialConnectionName">Twitter</p>
              </div>
              <div className="profileFormSocialCollectionBtnContainer">
                <button className="profileFormSocialConnectBtn">Connect</button>
              </div>
            </div>

            <div className="profileFormSocialConnectionIconAndBtnContainer">
              <div className="profileFormSocialConnectionIconContainer">
                <FaInstagram className="profileFormSocialConnectionIcon" />
              </div>
              <div className="profileFormSocialConnectionNameContainer">
                <p className="profileFormSocialConnectionName">Instagram</p>
              </div>
              <div className="profileFormSocialCollectionBtnContainer">
                <button className="profileFormSocialConnectBtn">Connect</button>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ margin: "15px 0px" }} />

        <div className="profileFormContainer">
          <div className="profileFormItemHeadingContainer">
            <p className="profileFormItemHeading">Links</p>
          </div>
          <div className="profileFormContainerInputContainer">
            <input
              autocomplete="off"
              type="text"
              placeholder="yourwebsite.com"
              className="profileFormContainerInput"
            />
          </div>

          <div className="profileFormContainer">
            <div className="profileFormItemHeadingContainer">
              <p className="profileFormItemHeading">Wallet Address</p>
            </div>
            <div
              className="profileFormContainerInput"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <input
                style={{
                  fontSize: "14px",
                  width: "100%",

                  border: "none",
                  color: "white",
                  outline: "none",
                  background: "#1a1a1a",
                  "&:hover": {
                    background: "#292929",
                  },
                }}
                value={currentAccount.toLowerCase()}
                autocomplete="off"
                type="text"
                readOnly
              ></input>
              <MdOutlineContentCopy
                onClick={(e) =>
                  navigator.clipboard.writeText(currentAccount.toLowerCase())
                }
                style={{ color: "white", cursor: "pointer" }}
              ></MdOutlineContentCopy>
            </div>
          </div>
        </div>

        <div className="profileSaveBtnContainer">
          <button
            className="profileSaveBtn"
            onClick={async () => await handleProfile()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
