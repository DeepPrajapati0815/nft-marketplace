import "./collectionItems.css";

const CollectionItems = ({ nfts, collection }) => {
  return (
    <div className="collectionItemContainerMain">
      <div className="collectionItemContainer">
        <ul className="collectionItemUl">
          <li className="collectionItems">
            <h6>Items</h6>
            <span className="collectionItemSpan">
              <h5>{nfts?.length}</h5>
            </span>
          </li>
          <li className="collectionItems">
            <h6>Created</h6>

            <span className="collectionItemSpan">
              <h5>{collection?.createdAt?.slice(0, 10)}</h5>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionItems;
