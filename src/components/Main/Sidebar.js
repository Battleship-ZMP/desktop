import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Cool Recipes</div>
      <div className="list-group list-group-flush ">
        <Link
          to="/"
          className="list-group-item list-group-item-action bg-light"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
