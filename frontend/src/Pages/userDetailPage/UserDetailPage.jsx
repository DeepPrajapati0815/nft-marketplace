import UserDetails from "../../components/userDetails/UserDetails";
import "./userDetailPage.css";

const UserDetailPage = ({ search }) => {
  return (
    <>
      <UserDetails search={search}  />
    </>
  );
};

export default UserDetailPage;
