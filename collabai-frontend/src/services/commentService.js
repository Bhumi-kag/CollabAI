import api from "./api";

export const getComments = async (taskId) => {
  const response = await api.get(`/comments/task/${taskId}`);
  return response.data;
};

export const addComment = async (comment) => {
  const response = await api.post("/comments", comment);
  return response.data;
};