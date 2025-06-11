import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import AuthAPI from "../../services/apis/endpoints/auth";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      const username = "admin";
      const { data } = await AuthAPI.resetPassword(username);
      if (data.responseCode && data.responseCode !== 200) {
        throw new Error(data.message || "Không thể reset mật khẩu");
      }
      toast.success("Reset mật khẩu thành công!");
      setTimeout(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Có lỗi khi reset mật khẩu";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-xs mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 transition-colors duration-200"
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
          {loading ? "Đang reset..." : "Reset Password"}
        </button>
      </div>
    </>
  );
};

export default ResetPasswordPage;
