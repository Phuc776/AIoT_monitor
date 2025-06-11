import api from "../index";

const UserAPI = {
  create: (data) => api.post("/admin/create-user", data),
  getAll: (page, size) => api.get(`/admin?page=${page}&size=${size}`),
};

export default UserAPI;
