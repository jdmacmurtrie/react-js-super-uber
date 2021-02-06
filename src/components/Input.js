import React from "react";
import classNames from "classnames";

export default function Input({ id, label, handleChange, showError, value }) {
  const errorClass = showError && "input-label--error";
  return (
    <label className={classNames("input-label", errorClass)}>
      {label}
      <input type="text" value={value} onChange={(value) => handleChange(value, id)} />
      {showError && (
        <div className="input-error-text">{`Please enter a valid ${label.toLowerCase()}`}</div>
      )}
    </label>
  );
}
