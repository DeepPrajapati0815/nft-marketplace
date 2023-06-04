import { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiCloseLine, RiEqualizerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import Searchbar from "../searchbar/Searchbar";
import SearchItemsContainer from "../searchItemsContainer/SearchItemsContainer";
import lucentLogo from "./lucentLogo.png";
import "./navbar.css";

const Navbar = ({
  openSidebar,
  setOpenSidebar,
  search,
  setSearch,
  collections,
  nfts,
}) => {
  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext);

  const [openCollectionItems, setOpenCollectionItems] = useState(false);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: "111111",
          },
        }}
      />
      <nav className="navContainer">
        <div className="navResponsiveBtnContainer">
          {openSidebar ? (
            <RiCloseLine
              className="navResponsiveBtn"
              onClick={() => setOpenSidebar(false)}
            ></RiCloseLine>
          ) : (
            <RiEqualizerLine
              onClick={() => setOpenSidebar(!openSidebar)}
              className="navResponsiveBtn"
            />
          )}
        </div>
        <div className="logoContainer">
          {/* <p className="logo">LOGO</p> */}

          <Link to="/marketplace">
            <img src={lucentLogo} alt="logo" className="logo"></img>
          </Link>
        </div>

        <div className="searchContainerMain">
          <Searchbar
            title={"Search Here.."}
            search={search}
            openCollectionItems={openCollectionItems}
            setOpenCollectionItems={setOpenCollectionItems}
            setSearch={setSearch}
          ></Searchbar>
          {search !== "" && (
            <SearchItemsContainer
              setOpenCollectionItems={setOpenCollectionItems}
              setSearch={setSearch}
              collections={collections}
              nfts={nfts}
            />
          )}
        </div>
        <ul className="navUl">
          <Link to="/marketplace" className="navItemsLink">
            <li className="navItems">Home</li>
          </Link>
          <Link to="/marketplace/shop" className="navItemsLink">
            <li className="navItems">Shop</li>
          </Link>
          <Link
            to="/marketplace/categories/photography"
            className="navItemsLink"
          >
            <li className="navItems">Explore</li>
          </Link>
        </ul>
        <div className="signInContainer">
          {currentAccount ? (
            <>
              <Link to={"/marketplace/create"}>
                <button className="signIn">Create</button>
              </Link>
            </>
          ) : (
            <button className="signInBtn" onClick={connectWallet}>
              Sign In
            </button>
          )}
          {currentAccount && (
            <>
              <div className="userLogoutBtn">
                <Link to={"/marketplace/user"} className="navItemsLink">
                  <CgProfile className="navProfileIcon" />
                </Link>
                <div
                  className="logoutBtn"
                  onClick={() => {
                    localStorage.setItem("account", "");
                    toast.success("Logout Successfull!");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1200);
                  }}
                >
                  <BiLogOut></BiLogOut>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
