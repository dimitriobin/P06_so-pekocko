import axios, { AxiosInstance } from "axios";

export const serverInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:80/api",
  headers: {
    "Content-type": "application/json",
  },
});
