import api from "./api";

export const getActivity = async (workspaceId) => {
  const response = await api.get(`/activity/${workspaceId}`);
  return response.data;
};