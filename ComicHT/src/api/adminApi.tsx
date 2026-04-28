import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/admin";

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  roleId: string;
  permissionIds: (number | string | null)[];
}) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const updateUserById = async (
  id: number,
  data: {
    name: string;
    email: string;
    password: string;
    roleId: number | string;
    permissionIds: (number | string)[];
  }
) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await axios.get(`${API_URL}/show/${id}`);
  return res.data;
};

export const deletetUserById = async (id: number) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};
