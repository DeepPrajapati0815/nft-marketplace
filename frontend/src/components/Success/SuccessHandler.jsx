import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./successHandler.css";

const SuccessHandler = () => {
  return (
    <div className="successContainer">
      <p className="successMessage"></p>
      <CgClose className="closeSuccessIcon"></CgClose>
    </div>
  );
};

export default SuccessHandler;
