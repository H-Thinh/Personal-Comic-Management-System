import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/comment";

export const createComment = async (data: {
  comicId: number;
  userId: number;
  content: string;
  parentId: number | null;
  chapterId: number | null;
}) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const getCommentsWithChapter = async (
  comicId: number,
  chapterId: number
) => {
  const res = await axios.get(`${API_URL}/show/${comicId}/  ${chapterId}`);
  return res.data;
};

export const getCommentsWithComic = async (id: number) => {
  const res = await axios.get(`${API_URL}/list/${id}`);
  return res.data;
};

export const getComments = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};

export const UpdateStatusForComment = async (
  id: number,
  data: {
    comicId: number;
    userId: number;
  }
) => {
  console.log(id);

  const res = await axios.put(`${API_URL}/status/${id}`, data);
  return res.data;
};
