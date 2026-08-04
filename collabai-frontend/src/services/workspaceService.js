import api from "./api";

/* ===========================
   GET ALL WORKSPACES
=========================== */

export const getWorkspaces = async () => {
  const response = await api.get("/workspaces");
  return response.data;
};

/* ===========================
   CREATE WORKSPACE
=========================== */

export const createWorkspace = async (workspace) => {
  const response = await api.post("/workspaces", workspace);
  return response.data;
};

/* ===========================
   UPDATE WORKSPACE
=========================== */

export const updateWorkspace = async (id, workspace) => {
  const response = await api.put(`/workspaces/${id}`, workspace);
  return response.data;
};

/* ===========================
   DELETE WORKSPACE
=========================== */

export const deleteWorkspace = async (id) => {
  const response = await api.delete(`/workspaces/${id}`);
  return response.data;
};

/* ===========================
   SELECT WORKSPACE
=========================== */

export const selectWorkspace = (workspace) => {
  localStorage.setItem(
    "selectedWorkspace",
    JSON.stringify(workspace)
  );
};

/* ===========================
   GET SELECTED WORKSPACE
=========================== */

export const getSelectedWorkspace = () => {
  const workspace = localStorage.getItem("selectedWorkspace");
  return workspace ? JSON.parse(workspace) : null;
};

/* ===========================
   CLEAR SELECTED WORKSPACE
=========================== */

export const clearSelectedWorkspace = () => {
  localStorage.removeItem("selectedWorkspace");
};