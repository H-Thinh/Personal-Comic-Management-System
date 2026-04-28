import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/genre";

export const getGenreList = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};

export const getComicByIdGenre = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};

export const createGenre = async (data: { name: string }) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const updateGenre = async (id: number, data: { name: string }) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const deleteGenre = async (id: number) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};
