import "./loader.css";
import { Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#fff"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <p className="loaderHeading">Loading...</p>
    </div>
  );
};

export default Loader;
