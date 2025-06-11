import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <header className="flex items-center justify-end bg-white border-b p-4">
      <button
        onClick={handleLogout}
        className="flex items-center px-3 py-1 rounded hover:bg-gray-200"
      >
        <FaSignOutAlt className="mr-2" />
        Đăng xuất
      </button>
    </header>
  );
};

export default Header;
