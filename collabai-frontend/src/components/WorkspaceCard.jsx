import {
  FolderKanban,
  User,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function WorkspaceCard({
  workspace,
  onSelect,
}) {

  const navigate = useNavigate();

  const handleOpenWorkspace = () => {
    onSelect(workspace);

    // Navigate to workspace details page
    navigate(`/workspaces/${workspace.id}`);
  };

  return (
    <div className="group rounded-3xl bg-white shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">

        <div className="flex items-center justify-between">

          <FolderKanban size={38} />

          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            Workspace
          </span>

        </div>

        <h2 className="mt-5 text-2xl font-bold">
          {workspace.name}
        </h2>

      </div>

      {/* Body */}

      <div className="p-6">

        <p className="text-slate-600 leading-relaxed min-h-[60px]">
          {workspace.description || "No description available."}
        </p>

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-3 text-slate-600">

            <User
              size={18}
              className="text-cyan-600"
            />

            <span>
              <strong>Owner:</strong>{" "}
              {workspace.ownerName || "Unknown"}
            </span>

          </div>

          <div className="flex justify-between text-sm text-slate-500">

            <span>👥 Members: 0</span>

            <span>📋 Tasks: 0</span>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">

            <span>Progress</span>

            <span>0%</span>

          </div>

          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

            <div className="h-2 w-0 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

          </div>

        </div>

        {/* Button */}

        <button
          onClick={handleOpenWorkspace}
          className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-white font-semibold hover:bg-cyan-700 transition"
        >
          Open Workspace
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}