import React from "react";

export default ({ children, disabled, onClick }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
