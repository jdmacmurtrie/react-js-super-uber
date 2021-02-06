import React from "react";
import classNames from "classnames";
import chevron from "../chevron-icon.svg";

export default function Drawer({ children, heading, open, toggleDrawer }) {
  const flipChevronClass = open && "drawer-chevron--flip";

  return (
    <div className="drawer">
      <div className="drawer-heading" onClick={() => toggleDrawer(!open)}>
        <h3 className="drawer-heading-text">{heading}</h3>
        <img
          src={chevron}
          className={classNames("drawer-chevron", flipChevronClass)}
          alt="chevron"
        />
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
