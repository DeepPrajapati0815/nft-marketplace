import "./userNftCollectionAndCreationBtnContainer.css";
const UserNftCollectionAndCreationBtnContainer = ({
  active,
  setActive,
  created,
  collected,
  favorites,
  royalties,
  collections,
}) => {
  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <>
      <div className="userNftCollectionAndCreationBtnContainer">
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={(e) => handleClick(1)}
            className={
              active === 1
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Collected <span className="UserNftCollectionBtn">{collected}</span>
          </p>
        </div>
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={() => handleClick(2)}
            className={
              active === 2
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Created <span className="UserNftCollectionBtn">{created}</span>
          </p>
        </div>
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={() => handleClick(3)}
            className={
              active === 3
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Royalties <span className="UserNftCollectionBtn">{royalties}</span>
          </p>
        </div>
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={() => handleClick(4)}
            className={
              active === 4
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Favorite <span className="UserNftCollectionBtn">{favorites}</span>
          </p>
        </div>
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={() => handleClick(5)}
            className={
              active === 5
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Collections{" "}
            <span className="UserNftCollectionBtn">{collections}</span>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserNftCollectionAndCreationBtnContainer;
