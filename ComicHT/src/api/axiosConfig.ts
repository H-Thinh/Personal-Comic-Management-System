import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

export default axios;
