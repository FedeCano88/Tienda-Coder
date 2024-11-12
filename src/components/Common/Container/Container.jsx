import React from "react";
import "./Container.css";

function Container({ welcomeMessage, children }) {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <p className="lead">{welcomeMessage}</p>
      </div>
      <div className="row justify-content-center">{children}</div>
    </div>
  );
}

export default Container;
