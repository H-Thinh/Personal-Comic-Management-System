import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/history";

export const createHistory = async (data: {
  comicId: number;
  userId: number;
  chapterId: number;
}) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const getHistoryByUserId = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};
