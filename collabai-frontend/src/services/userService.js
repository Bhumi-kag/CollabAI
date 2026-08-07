import api from "./api";

// Get logged-in user
export const getProfile = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

// Update profile
export const updateProfile = async (profile) => {
  const response = await api.put("/users/me", profile);
  return response.data;
};