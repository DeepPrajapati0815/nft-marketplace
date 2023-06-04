import { useState } from "react";
import "./userBio.css";

const UserBio = ({ userDetails }) => {
  const [openDesc, setOpenDesc] = useState(false);

  return (
    <div className="userBioContainer">
      <p className="userBio" style={{ fontSize: "1rem" }}>
        {userDetails?.bio?.length > 100 ? (
          <>
            <span>{userDetails?.bio?.slice(0, 100)}</span>

            {!openDesc && (
              <span
                style={{ cursor: "pointer", color: "#40b5b5" }}
                onClick={() => setOpenDesc(true)}
              >
                ...
              </span>
            )}
            {openDesc && (
              <>
                <span>{userDetails?.bio?.slice(100)}</span>
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
        ) : (
          <span>{userDetails?.bio?.slice(0, 100)}</span>
        )}
      </p>
    </div>
  );
};

export default UserBio;
