import api from "../../index";

const ProfileAPI = {
  createProfile: (data) => api.post(`/team-lead/profile`, data),
  getProfilesByPage: (page, size) =>
    api.get(`/team-lead/profile?page=${page}&size=${size}`),
  getProfileById: (id) => api.get(`/team-lead/profile/${id}`),
  updateProfile: (id, data) => api.post(`/team-lead/profile/${id}`, data),
  deleteProfile: (id) => api.delete(`/team-lead/profile/${id}`),

  assignOperators: (profileId, operatorIds) =>
    api.post(`/team-lead/profile/${profileId}/assign-operators`, operatorIds),

  getOperators: (page, size) =>
    api.get(`/team-lead/profile/operators?page=${page}&size=${size}`),
};

export default ProfileAPI;
