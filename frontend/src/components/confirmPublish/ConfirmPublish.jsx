import "./confirmPublish.css";

const ConfirmPublish = ({ showConfirmBox, setShowConfirmBox }) => {
  return (
    <div className="ConfirmPublishContainerMain">
      <div className="ConfirmPublishContainer">
        <div className="confirmPublishHeadingContainer">
          <p className="confirmPublishHeading">
            Do you wanna {showConfirmBox.type}!?
          </p>
        </div>
        <hr />
        <div className="ConfirmPublishBtnContainer">
          <button
            className="ConfirmPublishBtn"
            onClick={() => {
              showConfirmBox.action();
              setShowConfirmBox({ open: false, type: "", action: null });
              // window.location.reload();
            }}
          >
            Yes
          </button>
          <button
            className="ConfirmPublishBtn"
            onClick={() =>
              setShowConfirmBox({ open: false, type: "", action: null })
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPublish;
