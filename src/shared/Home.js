import React from "react";
import farmerimage from "../assets/farmerimage.png";

function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <img
        src={farmerimage}
        alt="Farmer"
        style={{
          width: "auto",
          height: "auto",
           
        }}
      />
    </div>
  );
}

export default Home;
