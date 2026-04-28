import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/auth";

export const logoutUser = async () => {
  const res = await axios.get(`${API_URL}/logout`);
  return res.data;
};

export const getInfo = async () => {
  const res = await axios.get(`${API_URL}/info`);
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const verifytoken = async () => {
  const res = await axios.get(`${API_URL}/verifytoken`);
  return res.data;
};
