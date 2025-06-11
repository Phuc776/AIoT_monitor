import api from "../../index";

const DeviceGroupAPI = {
  getGroupsByPage: (page, size) =>
    api.get(`/team-lead/device-group?page=${page}&size=${size}`),
  getAvailableDevices: (page, size) =>
    api.get(
      `/team-lead/device-group/available-devices?page=${page}&size=${size}`
    ),
  getGroupById: (id) => api.get(`/team-lead/device-group/${id}`),
  createGroup: (data) => api.post(`/team-lead/device-group`, data),
  addDevicesToGroup: (groupId, deviceIds) =>
    api.post(`/team-lead/device-group/${groupId}/add-device`, deviceIds),
};

export default DeviceGroupAPI;
