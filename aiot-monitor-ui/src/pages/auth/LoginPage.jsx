import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoEye, GoEyeClosed } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import AuthAPI from "../../services/apis/endpoints/auth";
import { login } from "../../features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!user || !token) return;

    const roleToRoute = {
      ROLE_ADMIN: "/admin/dashboard",
      ROLE_TEAM_LEAD: "/team-lead/dashboard",
      ROLE_OPERATOR: "/operator/dashboard",
      ROLE_SUPERVISOR: "/supervisor/dashboard",
    };

    const target = roleToRoute[user.role] || "/login";
    navigate(target, { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const handleReset = async () => {
    setLoadingReset(true);
    try {
      const userToReset = username || "admin";
      const { data } = await AuthAPI.resetPassword(userToReset);
      if (data.responseCode && data.responseCode !== 200) {
        throw new Error(data.message || "Không thể reset mật khẩu");
      }
      toast.success("Reset mật khẩu thành công!");
      // Xoá token nếu cần
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Có lỗi khi reset mật khẩu";
      toast.error(msg);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-md mx-auto mt-0 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Nhập tên tài khoản"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-md pr-10"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <GoEyeClosed /> : <GoEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={loadingReset}
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              {loadingReset && <FaSpinner className="animate-spin mr-1" />}
              Reset Password
            </button>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            {status === "loading" ? "Loading..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
