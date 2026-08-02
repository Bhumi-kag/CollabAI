import api from "./api";

export const getTasksByWorkspace = async (workspaceId) => {
  const response = await api.get(`/tasks/workspace/${workspaceId}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await api.put(`/tasks/${taskId}/status`, {
    status,
  });

  return response.data;
};

export const assignTask = async (taskId, userId) => {
  const response = await api.put(`/tasks/${taskId}/assign`, {
    userId,
  });

  return response.data;
};