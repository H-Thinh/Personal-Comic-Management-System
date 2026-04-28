import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/author";

export const getAuthorList = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};

export const createAuthor = async () => {
  const res = await axios.post(`${API_URL}/add`);
  return res.data;
};

export const updateAuthor = async (id: number) => {
  const res = await axios.put(`${API_URL}/update/${id}`);
  return res.data;
};

export const deleteAuthor = async (id: number) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};
