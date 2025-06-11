import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FiUser,
  FiLock,
  FiUserCheck,
  FiUserPlus,
  FiX,
  FiCheck,
} from "react-icons/fi";
import UserAPI from "../../services/apis/endpoints/user";
import { FaSpinner } from "react-icons/fa";

const roleOptions = [
  {
    value: "ROLE_OPERATOR",
    label: "Operator",
    icon: <FiUser className="mr-2" />,
  },
  {
    value: "ROLE_SUPERVISOR",
    label: "Supervisor",
    icon: <FiUserCheck className="mr-2" />,
  },
  {
    value: "ROLE_TEAM_LEAD",
    label: "Team Lead",
    icon: <FiUserPlus className="mr-2" />,
  },
];

const CreateUserPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "ROLE_OPERATOR",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await UserAPI.create(form);
      // Kiểm tra responseCode từ API
      if (data.responseCode && data.responseCode !== 200) {
        throw new Error(data.message || "Không thể tạo người dùng");
      }
      toast.success(`Đã tạo người dùng thành công!`);
      setForm({ username: "", password: "", role: "ROLE_OPERATOR" });
    } catch (err) {
      console.error(err);
      // Lấy message từ response hoặc err.message
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Có lỗi xảy ra khi tạo người dùng";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedRoleIcon = () => {
    const selectedRole = roleOptions.find((role) => role.value === form.role);
    return selectedRole ? selectedRole.icon : null;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {/* Thêm Toaster vào đây */}
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Tạo người dùng mới
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Nhập tên đăng nhập"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {getSelectedRoleIcon()}
            </div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
                <FaSpinner />
                Đang tạo...
              </>
            ) : (
              <>
                <FiUserPlus className="mr-2" /> Tạo người dùng
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
