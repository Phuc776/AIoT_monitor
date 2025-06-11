import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaTachometerAlt } from "react-icons/fa";

const SupervisorSidebar = () => {
  return (
    <nav className="w-64 bg-white border-r h-full">
      <div className="p-4 text-xl font-bold">AIoT Monitor</div>
      <ul className="p-2">
        <li className="mb-2">
          <NavLink
            to="/supervisor/dashboard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 hover:bg-gray-200 ` +
              (isActive ? "bg-gray-200 font-semibold" : "")
            }
          >
            <FaTachometerAlt className="mr-3" />
            Trang chủ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SupervisorSidebar;
