import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/comic";

export const getComicList = async (
  page?: number,
  limit?: number,
  sort?: "view_asc" | "view_desc" | "time_asc" | "time_desc"
) => {
  const res = await axios.get(
    `${API_URL}/list?page=${page}&limit=${limit}&sort=${sort}`
  );
  return res.data;
};

export const getComicListByView = async (page?: number) => {
  const res = await axios.get(`${API_URL}/listrank?page=${page}`);
  return res.data;
};

export const getComicById = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};

export const createComic = async (data: FormData) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const updateComicById = async (id: number, data: FormData) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const deleteComic = async (id: number) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};

export const searchComics = async (name: string) => {
  const res = await axios.get(`${API_URL}/search/?name=${name}`);
  return res.data;
};

export const updateViewComic = async (comicId: number, userId: number) => {
  const res = await axios.get(`${API_URL}/updateviews/${comicId}/${userId}`);
  return res.data;
};
