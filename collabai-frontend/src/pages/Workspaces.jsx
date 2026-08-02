import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import WorkspaceCard from "../components/WorkspaceCard";

import {
  getWorkspaces,
  selectWorkspace,
} from "../services/workspaceService";

export default function Workspaces() {

  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (workspace) => {

    selectWorkspace(workspace);

    toast.success(`${workspace.name} selected successfully`);

  };

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Workspaces
        </h1>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

        {workspaces.map((workspace) => (

          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            onSelect={handleSelect}
          />

        ))}

      </div>

    </div>

  );
}