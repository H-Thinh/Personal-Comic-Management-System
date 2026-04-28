import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/admin/role";

export const getRoles = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};

export const createRole = async (data: { name: string }) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const updateRole = async (
  id: number,
  data: {
    name: string;
  }
) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};
