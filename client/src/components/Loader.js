import React ,{ useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: " auto",
  borderColor: "red",
};

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading" >
      
      <RingLoader
        color="#000"
        loading={loading}
        cssOverride=''
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;