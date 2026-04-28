import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/rate";

export const createRatingForComic = async (data: {
  comicId: number;
  userId: number;
  rating: number;
}) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const getRatingByComicId = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};

export const UpdateStatusForRate = async (
  id: number,
  data: {
    comicId: number;
    userId: number;
  }
) => {
  const res = await axios.put(`${API_URL}/status/${id}`, data);
  return res.data;
};

export const getRates = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};
