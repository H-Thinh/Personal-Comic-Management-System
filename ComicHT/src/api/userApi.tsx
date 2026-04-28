import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/user";

export const updateUser = async (
  id: number,
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await axios.get(`${API_URL}/list/${id}`);
  return res.data;
};
