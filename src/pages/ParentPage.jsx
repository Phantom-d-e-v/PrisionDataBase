import React from "react";

const ParentPgae = ({ props, children }) => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #b06ab3, #4568dc)",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default ParentPgae;
