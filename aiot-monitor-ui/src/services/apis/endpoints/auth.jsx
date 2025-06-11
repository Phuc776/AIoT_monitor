import api from "../index";

const AuthAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  // register: (data) => api.post("/admin/create-user", data),
  resetPassword: (username) =>
    api.post("/auth/reset-password", username, {
      headers: { "Content-Type": "text/plain" },
    }),
  updatePassword: (data, token) =>
    api.post("/auth/update-password", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default AuthAPI;
