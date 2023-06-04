import "./navSideBar.css";

import { Link } from "react-router-dom";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { Toaster } from "react-hot-toast";

const NavSideBar = () => {
  const { connectWallet, setCurrentAccount } = useContext(
    NFTMarketplaceContext
  );

  const currentAccount = localStorage.getItem("account");

  return (
    <>
      <div className="navSideBarContainer">
        <div className="navResponsiveListItemContainer">
          <ul className="navResponsiveListItemUl">
            <li className="navResponsiveListItem">
              <Link
                to="/marketplace/shop"
                className="navResponsiveListItemAnchor"
              >
                Shop
              </Link>
            </li>
            <li className="navResponsiveListItem">
              <Link
                to="/marketplace/categories/photography"
                className="navResponsiveListItemAnchor"
              >
                Explore
              </Link>
            </li>
            <li className="navResponsiveListItem">
              <Link to="/marketplace" className="navResponsiveListItemAnchor">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="navResponsiveListHr" />
        <div className="responsiveSignInContainer">
          {currentAccount ? (
            <>
              <Link to="/marketplace/create">
                <button className="responsiveSignIn">Create</button>
              </Link>
              <button
                className="responsiveLogout"
                onClick={() => {
                  localStorage.setItem("account", "");
                  window.location.reload();
                }}
              >
                <BiLogOut></BiLogOut>&nbsp;&nbsp;Logout
              </button>
            </>
          ) : (
            <button className="responsiveSignIn" onClick={connectWallet}>
              Sign In
            </button>
          )}
        </div>
        <hr className="navResponsiveListHr" />
        <div className="navResponsiveListItemContainer">
          <ul className="navResponsiveListItemUl">
            <li className="navResponsiveListItem">
              <a href="/" className="navResponsiveListItemAnchor">
                Help
              </a>
            </li>
            <li className="navResponsiveListItem">
              <a href="/" className="navResponsiveListItemAnchor">
                Term of Service
              </a>
            </li>
            <li className="navResponsiveListItem">
              <a href="/" className="navResponsiveListItemAnchor">
                Feedback
              </a>
            </li>
            <li className="navResponsiveListItem">
              <a href="/" className="navResponsiveListItemAnchor">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavSideBar;
