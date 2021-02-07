import React from "react";
import classNames from "classnames";
import chevron from "../chevron-icon.svg";

export default ({ children, heading, open, toggleDrawer }) => {
  const flipChevronClass = open && "drawer-chevron--flip";
  const drawerOpenClass = open && "drawer-heading--open";

  return (
    <div className="drawer">
      <div
        className={classNames("drawer-heading", drawerOpenClass)}
        onClick={() => toggleDrawer(!open)}
      >
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
};
