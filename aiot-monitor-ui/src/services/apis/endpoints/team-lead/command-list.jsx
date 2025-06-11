import api from "../../index";

const CommandListAPI = {
  createCommandList: (data) => api.post(`/team-lead/command-list`, data),
  getCommandListsByPage: (page, size) =>
    api.get(`/team-lead/command-list?page=${page}&size=${size}`),
  getCommandListById: (id) => api.get(`/team-lead/command-list/${id}`),
  updateCommandList: (id, data) =>
    api.put(`/team-lead/command-list/${id}`, data),
  deleteCommandList: (id) => api.delete(`/team-lead/command-list/${id}`),
};

export default CommandListAPI;
