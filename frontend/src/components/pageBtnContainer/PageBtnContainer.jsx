import React from "react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import "./pageBtnContainer.css";

const PageBtnContainer = ({ page, onPageChange }) => {
  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };
  
  return (
    <div className="pageBtnContainer">
      <button onClick={onPrevious}>
        <AiOutlineCaretLeft></AiOutlineCaretLeft>
      </button>
      <button onClick={onNext}>
        <AiOutlineCaretRight></AiOutlineCaretRight>
      </button>
    </div>
  );
};

export default PageBtnContainer;
