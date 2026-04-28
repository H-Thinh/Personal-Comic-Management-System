import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/chapter";

export const getChapterById = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};

export const getChapterDetailById = async (
  comicId: number,
  chapterId: number
) => {
  const res = await axios.get(`${API_URL}/list/${comicId}/${chapterId}`);
  return res.data;
};

export const createChapterById = async (
  id: number,
  order: number,
  data: { name: string }
) => {
  const res = await axios.post(`${API_URL}/add/${id}/?order=${order}`, data);
  return res.data;
};

export const updateChapterById = async (
  id: number,
  order: number,
  data: { name: string }
) => {
  const res = await axios.put(`${API_URL}/update/${id}/?order=${order}`, data);
  return res.data;
};

export const deleteChapterById = async (id: number) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};
