import {
  FolderKanban,
  User,
  ArrowRight,
  Users,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function WorkspaceCard({
  workspace,
  onSelect,
}) {
  const navigate = useNavigate();

  const handleOpenWorkspace = () => {
    onSelect(workspace);
    navigate(`/workspaces/${workspace.id}`);
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition">

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

          <div className="flex items-center gap-3 text-slate-700">
            <User size={18} className="text-cyan-600" />
            <span>
              <strong>Owner:</strong> {workspace.ownerName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <Users size={18} className="text-blue-600" />
            <span>
              <strong>Members:</strong> {workspace.memberCount}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <ClipboardList size={18} className="text-indigo-600" />
            <span>
              <strong>Tasks:</strong> {workspace.taskCount}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <CheckCircle size={18} className="text-green-600" />
            <span>
              <strong>Completed:</strong> {workspace.completedTaskCount}
            </span>
          </div>

        </div>

        {/* Progress */}

        <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{workspace.progress}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

            <div
              className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"
              style={{
                width: `${workspace.progress}%`,
              }}
            />

          </div>

        </div>

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