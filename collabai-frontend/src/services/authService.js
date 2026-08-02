import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data);

  return response.data;
};

export const register = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};