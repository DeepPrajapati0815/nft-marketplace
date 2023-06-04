import "./collectionDescription.css";
import { useState } from "react";

const CollectionDescription = ({ collection }) => {
  const [openDesc, setOpenDesc] = useState(false);
  return (
    <div className="collectionDescriptionContainer">
      <p className="collectionDescription">
        {collection?.collectionDescription?.length > 100 && (
          <>
            <span>{collection?.collectionDescription?.slice(0, 100)}</span>

            {!openDesc && (
              <span
                style={{ cursor: "pointer", color: "#40b5b5" }}
                onClick={() => setOpenDesc(true)}
              >
                {" "}
                ...
              </span>
            )}
            {openDesc && (
              <>
                <span>{collection?.collectionDescription?.slice(100)}</span>
                <br />
                <span
                  style={{
                    cursor: "pointer",
                    marginTop: "10px",
                    color: "#40b5b5",
                  }}
                  onClick={() => setOpenDesc(false)}
                >
                  show less
                </span>
              </>
            )}
          </>
        )}
      </p>
    </div>
  );
};

export default CollectionDescription;
