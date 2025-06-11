import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiLock, FiCheck, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import AuthAPI from "../../services/apis/endpoints/auth";
import { FaSpinner } from "react-icons/fa";

const UpdatePasswordPage = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate matching passwords
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    // Prevent new password same as current
    if (form.newPassword === form.currentPassword) {
      toast.error("Mật khẩu mới không được trùng mật khẩu cũ");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await AuthAPI.updatePassword(form, token);
      if (data.responseCode && data.responseCode !== 200) {
        throw new Error(data.message || "Không thể cập nhật mật khẩu");
      }
      toast.success("Đổi mật khẩu thành công!", { duration: 1000 });
      setTimeout(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Có lỗi khi đổi mật khẩu";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "currentPassword", label: "Mật khẩu cũ", Icon: FiLock },
    { name: "newPassword", label: "Mật khẩu mới", Icon: FiX },
    { name: "confirmPassword", label: "Xác nhận mật khẩu", Icon: FiCheck },
  ];

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Đổi mật khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(({ name, label, Icon }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name={name}
                  type={show[name] ? "text" : "password"}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  placeholder={label}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => toggleShow(name)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {show[name] ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors duration-200"
          >
            {loading ? (
              <>
                <FaSpinner />
                Đang cập nhật...
              </>
            ) : (
              <>
                <FiCheck className="mr-2" />
                Cập nhật mật khẩu
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePasswordPage;
