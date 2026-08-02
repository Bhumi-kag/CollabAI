import api from "./api";

export const getMembers = async (workspaceId) => {
  const response = await api.get(`/members/${workspaceId}`);
  return response.data;
};

export const addMember = async (member) => {
  const response = await api.post("/members", member);
  return response.data;
};