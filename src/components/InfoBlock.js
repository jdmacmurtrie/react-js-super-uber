import React from "react";

export default function InfoBlock({ detail, heading }) {
  return (
    <div className="info-block">
      <h5 className="info-block-heading">{heading}</h5>
      <p className="info-block-detail">{detail}</p>
    </div>
  );
}
