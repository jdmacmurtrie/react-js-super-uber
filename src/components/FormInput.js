import React from "react";
import classNames from "classnames";

export default function FormInput({ className, id, label, handleChange, showError, value }) {
  const errorClass = showError && "input-label--error";
  return (
    <label className={classNames("input-label", errorClass, className)}>
      {label}
      <input type="text" value={value} onChange={(value) => handleChange(value, id)} />
      {showError && (
        <div className="input-error-text">{`Please enter a valid ${label.toLowerCase()}`}</div>
      )}
    </label>
  );
}
