import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ConfirmPublish from "./components/confirmPublish/ConfirmPublish";
import FooterContainer from "./components/footerContainer/FooterContainer";
import Navbar from "./components/navbar/Navbar";
import NavSideBar from "./components/navSidebar/NavSideBar";
import { NFTMarketplaceContext } from "./context/NFTMarketplaceContext";
import CategoryPage from "./Pages/categoryPage/CategoryPage";
import CollectionPage from "./Pages/collectionPage/CollectionPage";
import CreateNftPage from "./Pages/createNftPage/CreateNftPage";
import HomePage from "./Pages/homePage/HomePage";
import Details from "./Pages/nftDetails/Details";
import ProfilePage from "./Pages/profilePage/ProfilePage";
import ResellNftPage from "./Pages/resellNftPage/ResellNftPage";
import Shop from "./Pages/shop/Shop";
import UserDetailPage from "./Pages/userDetailPage/UserDetailPage";
import axios from "./utils/axios";
import useDebounce from "./utils/debounce";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);

  const navigate = useNavigate();

  if (window.location.pathname === "/") {
    navigate("/marketplace");
  }

  const { showConfirmBox, setShowConfirmBox, setCurrentAccount } = useContext(
    NFTMarketplaceContext
  );

  const fetchSearchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const collectionRes = await axios.get(
        `/api/v1/collections?search=${search}`,
        { headers: { Authorization: token } }
      );

      const nftsRes = await axios.get(`/api/v1/nfts?search=${search}`, {
        headers: { Authorization: token },
      });

      setNfts(nftsRes.data.data.nfts);
      setCollections(collectionRes.data.collections);
    } catch (error) {}
  };

  useEffect(() => {
    const account = localStorage.getItem("account");
    setCurrentAccount(account);
  });

  useDebounce(
    () => {
      fetchSearchData();
    },
    [search],
    800
  );
  window.scrollTo(0, 0);

  return showConfirmBox.open ? (
    <ConfirmPublish
      showConfirmBox={showConfirmBox}
      setShowConfirmBox={setShowConfirmBox}
    ></ConfirmPublish>
  ) : (
    <div className="App">
      <Navbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        search={search}
        setSearch={setSearch}
        nfts={nfts}
        collections={collections}
      />
      {openSidebar && <NavSideBar />}

      <Routes>
        <Route path="/marketplace/" element={<HomePage />}></Route>

        <Route
          path="/marketplace/shop"
          element={<Shop search={search} setSearch={setSearch} />}
        ></Route>

        <Route path="/marketplace/nft/:id" element={<Details />}></Route>

        <Route path="/marketplace/create" element={<CreateNftPage />}></Route>

        <Route
          path="/marketplace/user"
          element={<UserDetailPage search={search} setSearch={setSearch} />}
        ></Route>

        <Route
          path="/marketplace/resell/:id"
          element={<ResellNftPage />}
        ></Route>

        <Route
          path="/marketplace/categories/:category"
          element={<CategoryPage search={search} setSearch={setSearch} />}
        ></Route>

        <Route
          path="/marketplace/collection/:id"
          element={<CollectionPage search={search} setSearch={setSearch} />}
        ></Route>

        <Route path="/marketplace/user/edit" element={<ProfilePage />}></Route>
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
