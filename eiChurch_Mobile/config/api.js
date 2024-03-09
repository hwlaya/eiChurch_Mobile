import axios from "axios";

export const DEV_URL = "http://192.168.1.3:8000/api/";
export const PROD_URL = "https://sanroqueparish.com/api/";
export default api = axios.create({
  baseURL: PROD_URL,
});
