import axios from "axios";
const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1`,
});
export default api;