import "./userDetailJoiningDate.css";

const UserDetailJoiningDate = ({ userDetails }) => {
  return (
    <div className="userDetailJoiningDateContainer">
      <p className="userDetailJoiningDate">
        Joined {userDetails?.createdAt.slice(0, 10)}
      </p>
    </div>
  );
};

export default UserDetailJoiningDate;
