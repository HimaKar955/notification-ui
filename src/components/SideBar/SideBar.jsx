import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-light sidebar p-3">
      <h5
        onClick={() => {
          navigate("/");
        }}
      >
        Notification
      </h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" to="/insert-update">
            Insert/Update
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/delete">
            Delete
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/read-notification">
            Read
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
