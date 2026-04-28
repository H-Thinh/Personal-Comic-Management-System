import axios from "./axiosConfig";

const API_URL = "http://localhost:3001/api/admin/permission";

export const getPermissions = async () => {
  const res = await axios.get(`${API_URL}/list`);
  return res.data;
};
