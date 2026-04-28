import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/follow";

export const toggleFollow = async (data: {
  comicId: number;
  userId: number;
}) => {
  const res = await axios.post(`${API_URL}/toggle`, data);
  return res.data;
};

export const getComicFollowedByIdUser = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};

export const getListFollowedByIdUser = async (id: number) => {
  const res = await axios.get(`${API_URL}/list/${id}`);
  return res.data;
};
