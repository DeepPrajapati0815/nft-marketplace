import { Link } from "react-router-dom";
import "./categoriesCardContainer.css";

import CategoriesCards from "./categoriesCards/CategoriesCards";

const CategoriesCardContainer = ({ collections, currentAccount }) => {
  return collections.length > 0 ? (
    <div className="categoriesCardsContainerMains">
      {collections?.map((collection, i) => (
        <Link
          className="categoriesCardsLink"
          to={`/marketplace/collection/${collection?._id}?${
            currentAccount && "account=" + currentAccount.toLowerCase()
          }`}
        >
          <CategoriesCards key={i} collection={collection} />
        </Link>
      ))}
    </div>
  ) : (
    <div className="nftCardContainerNotFound">
      <p style={{ color: "#fff" }}>No items found</p>
    </div>
  );
};

export default CategoriesCardContainer;
