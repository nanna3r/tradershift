import React from "react";

export const Blocker = ({ show, message = "", loading }) => {
  if (!show) return null;

  return (
    <div className="blocker">
      <div className="content">
        {loading && <div className="loader"></div>}
        {message}
      </div>
    </div>
  );
};
