import { useTokenStore } from "@/store";
import axios from "axios";
import { config } from "process";

const api = axios.create({
  // baseURL: import.meta.env.BASEURL,
  baseURL: "http://localhost:9000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/users/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/users/register", data);

export const getBooks = async () => api.get("/books/getBooks");

export const createBook = async (data: FormData) =>
  api.post("/books/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
