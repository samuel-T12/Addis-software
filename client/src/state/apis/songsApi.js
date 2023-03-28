import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

export const getSongsAPI = async (payload) => {
  const { page = 1, limit = 10 } = payload;
  return axios.get(`/songs/?page=${page}&limit=${limit}`);
};

export const getSongStaticsAPI = async () => {
  return axios.get(`/songs/report/get-totals`);
};

export const createSongsAPI = async (payload) => {
  return axios.post(`/songs`, payload);
};

export const updateSongsAPI = async (payload) => {
  return axios.put(`/songs/${payload.id}`, payload);
};

export const deleteSongsAPI = async (payload) => {
  return axios.delete(`/songs/${payload.id}`);
};

export const getListAPI = async (payload) => {
  return axios.get(`/songs/report/get-list?type=${payload}`);
};
export const getInfoAPI = async (payload) => {
  console.log(payload);
  return axios.get(`/songs/report/get-stat?${payload.type}=${payload.value}`);
};
