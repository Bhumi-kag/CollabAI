import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Plus, Search, FolderKanban } from "lucide-react";

import WorkspaceCard from "../components/WorkspaceCard";

import {
  getWorkspaces,
  createWorkspace,
  selectWorkspace,
} from "../services/workspaceService";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [workspaceData, setWorkspaceData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load workspaces");
    }
  };

  const handleSelect = (workspace) => {
    selectWorkspace(workspace);
    toast.success(`${workspace.name} selected successfully`);
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceData.name.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    try {
      await createWorkspace(workspaceData);

      toast.success("Workspace created successfully");

      setWorkspaceData({
        name: "",
        description: "",
      });

      setShowModal(false);

      loadWorkspaces();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create workspace");
    }
  };

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-5 sm:p-6 lg:p-8 shadow-xl">

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          <FolderKanban
            size={55}
            className="flex-shrink-0"
          />

          <div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Workspaces
            </h1>

            <p className="text-cyan-100 mt-2 text-sm sm:text-base">
              Organize projects, collaborate with your team and manage tasks efficiently.
            </p>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col lg:flex-row gap-4">

        <div className="relative flex-1">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search workspace..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700 transition w-full lg:w-auto"
        >
          <Plus size={20} />
          New Workspace
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        <div className="rounded-2xl bg-white shadow p-5">

          <p className="text-gray-500">
            Total Workspaces
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-600 mt-2">
            {workspaces.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white shadow p-5">

          <p className="text-gray-500">
            Selected Workspace
          </p>

          <h2 className="text-lg sm:text-xl font-bold mt-2 break-words">
            {localStorage.getItem("selectedWorkspace")
              ? JSON.parse(localStorage.getItem("selectedWorkspace")).name
              : "None"}
          </h2>

        </div>

        <div className="rounded-2xl bg-white shadow p-5">

          <p className="text-gray-500">
            Search Results
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 mt-2">
            {filteredWorkspaces.length}
          </h2>

        </div>

      </div>

      {/* Workspace Cards */}

      {filteredWorkspaces.length === 0 ? (

        <div className="rounded-2xl bg-white p-8 sm:p-12 shadow text-center">

          <FolderKanban
            size={70}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-5 text-xl sm:text-2xl font-bold">
            No Workspaces Found
          </h2>

          <p className="mt-2 text-slate-500">
            Create your first workspace to start collaborating.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredWorkspaces.map((workspace) => (

            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onSelect={handleSelect}
            />

          ))}

        </div>

      )}

      {/* Create Workspace Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Create Workspace
            </h2>

            <input
              type="text"
              placeholder="Workspace Name"
              value={workspaceData.name}
              onChange={(e) =>
                setWorkspaceData({
                  ...workspaceData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <textarea
              rows="4"
              placeholder="Workspace Description"
              value={workspaceData.description}
              onChange={(e) =>
                setWorkspaceData({
                  ...workspaceData,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateWorkspace}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}