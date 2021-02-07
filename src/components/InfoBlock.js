import React from "react";
import classNames from "classnames";

export default ({ className, detail, heading }) => {
  return (
    <div className={classNames("info-block", className)}>
      <h5 className="info-block-heading">{heading}</h5>
      <p className="info-block-detail">{detail}</p>
    </div>
  );
};
