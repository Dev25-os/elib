import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.BASEURL,
  baseURL: "http://localhost:9000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/users/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/users/register", data);
