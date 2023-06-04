import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./errorHandler.css";

const ErrorHandler = ({ msg }) => {
  return (
    <div className="errorContainer">
      <p className="errorMessage">{msg}</p>
      <CgClose className="closeErrorIcon"></CgClose>
    </div>
  );
};

export default ErrorHandler;
