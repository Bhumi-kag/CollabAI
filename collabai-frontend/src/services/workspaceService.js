import api from "./api";

export const getWorkspaces = async () => {
  const response = await api.get("/workspaces");
  return response.data;
};

export const createWorkspace = async (workspace) => {
  const response = await api.post("/workspaces", workspace);
  return response.data;
};

export const selectWorkspace = (workspace) => {
  localStorage.setItem(
    "selectedWorkspace",
    JSON.stringify(workspace)
  );
};

export const getSelectedWorkspace = () => {
  const workspace = localStorage.getItem("selectedWorkspace");
  return workspace ? JSON.parse(workspace) : null;
};