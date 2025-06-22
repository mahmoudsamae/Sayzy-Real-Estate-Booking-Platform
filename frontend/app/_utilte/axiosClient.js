import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_DATABASE_URL;

const axiosClient = axios.create({
  baseURL: baseURL,
});

export default axiosClient;
