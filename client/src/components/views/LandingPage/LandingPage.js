import React, { useEffect } from "react";
import axios from "axios";

const LandingPage = (props) => {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res.data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      landing
    </div>
  );
};

export default LandingPage;
