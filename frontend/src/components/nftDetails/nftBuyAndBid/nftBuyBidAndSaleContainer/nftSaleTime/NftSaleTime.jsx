import "./nftSaleTime.css";
const NftSaleTime = () => {
  return (
    <div className="NftSaleTimeContainer">
      <div className="saleEndTimeContainer">
        <p className="saleAndTime">
          Sale ends February 15, 2023 at 8:19 PM IST+5:30{" "}
        </p>
      </div>
      <div className="timeContainer">
        <p className="time">
          <span className="timeAccurate">02 Hours </span>
          <span className="timeAccurate">14 Minutes </span>
          <span className="timeAccurate">04 Seconds</span>
        </p>
      </div>
    </div>
  );
};

export default NftSaleTime;
