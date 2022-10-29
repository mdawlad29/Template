import gif from "../../image/loader/loader.gif";
import LoaderSource from "./LoaderSource";

const QueryLoader = () => {
  const loaderStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  };
  return (
    <div style={loaderStyle}>
      <img className="w-20" src={gif} alt="Loading..." />
      {/* <LoaderSource /> */}
      {/* <CircularProgress
        sx={{
          color: "#000",
        }}
        size={100}
      /> */}
    </div>
  );
};

export default QueryLoader;
