import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const OperatorSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [username, setUsername] = useState("...");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || decoded.sub || "User");
      } catch {
        setUsername("operator");
      }
    }
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      path: "/operator/dashboard",
    },
    {
      title: "My Tasks",
      icon: "📋",
      path: "/operator/tasks",
    },
    {
      title: "Device Status",
      icon: "🖥️",
      path: "/operator/devices",
    },
    {
      title: "Command History",
      icon: "📜",
      path: "/operator/history",
    },
    // {
    //   title: "My Profile",
    //   icon: "👤",
    //   path: "/operator/profile",
    // },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav
      className={`bg-white border-r border-gray-200 h-full shadow-sm transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  AIoT Monitor
                </div>
                <div className="text-xs text-gray-500">Operator</div>
                <div className="text-xs text-green-600 font-medium">
                  Welcome, {username}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-green-50 text-green-700 border-r-2 border-green-600"
                      : ""
                  }`
                }
                title={isCollapsed ? item.title : ""}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.title}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors group"
            title={isCollapsed ? "Logout" : ""}
          >
            <span className="text-lg flex-shrink-0">🚪</span>
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default OperatorSidebar;
