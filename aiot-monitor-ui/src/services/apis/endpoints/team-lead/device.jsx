import api from "../../index";

const DeviceAPI = {
  getDevices: () => api.get("/team-lead/device"),
  getDevicesByPage: (page, size) =>
    api.get(`/team-lead/device?page=${page}&size=${size}`),
  getDeviceById: (id) => api.get(`/team-lead/device/${id}`),
  createDevice: (data) => api.post("/team-lead/device", data),
  updateDevice: (id, data) =>
    api.post(`/team-lead/device/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  deleteDevice: (id) => api.delete(`/team-lead/device/${id}`),
};

export default DeviceAPI;
