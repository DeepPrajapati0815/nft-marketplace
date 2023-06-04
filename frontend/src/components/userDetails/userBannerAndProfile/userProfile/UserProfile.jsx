import "./userProfile.css";

const UserProfile = ({ userDetails }) => {
  return (
    <div className="userProfileContainer">
      <img
        className="userProfileImage"
        src={
          userDetails?.image
            ? userDetails.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt=""
      />
    </div>
  );
};

export default UserProfile;
