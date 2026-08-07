import {
  FolderKanban,
  Users,
  ClipboardList,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function WorkspaceDetails() {

  const workspace = getSelectedWorkspace();

  if (!workspace) {
    return (
      <div className="text-center py-20">

        <h1 className="text-3xl font-bold">
          Workspace Not Found
        </h1>

        <Link
          to="/workspaces"
          className="mt-6 inline-block rounded-xl bg-cyan-600 px-6 py-3 text-white"
        >
          Back to Workspaces
        </Link>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          {workspace.name}
        </h1>

        <p className="mt-2 text-cyan-100">
          {workspace.description || "No description available."}
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="rounded-2xl bg-white shadow p-6 text-center">

          <Users
            size={40}
            className="mx-auto text-cyan-600"
          />

          <h2 className="mt-4 text-3xl font-bold">
            {workspace.memberCount}
          </h2>

          <p className="text-gray-500">
            Members
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 text-center">

          <ClipboardList
            size={40}
            className="mx-auto text-indigo-600"
          />

          <h2 className="mt-4 text-3xl font-bold">
            {workspace.taskCount}
          </h2>

          <p className="text-gray-500">
            Total Tasks
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 text-center">

          <CheckCircle
            size={40}
            className="mx-auto text-green-600"
          />

          <h2 className="mt-4 text-3xl font-bold">
            {workspace.completedTaskCount}
          </h2>

          <p className="text-gray-500">
            Completed
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 text-center">

          <FolderKanban
            size={40}
            className="mx-auto text-orange-600"
          />

          <h2 className="mt-4 text-3xl font-bold">
            {workspace.progress}%
          </h2>

          <p className="text-gray-500">
            Progress
          </p>

        </div>

      </div>

      {/* Workspace Information */}

      <div className="rounded-2xl bg-white shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Workspace Information
        </h2>

        <div className="space-y-4">

          <p>
            <strong>Name:</strong> {workspace.name}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {workspace.description || "No description available."}
          </p>

          <p>
            <strong>Owner:</strong>{" "}
            {workspace.ownerName}
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="rounded-2xl bg-white shadow p-8">

        <h2 className="text-2xl font-bold mb-4">
          Workspace Progress
        </h2>

        <div className="flex justify-between mb-2">

          <span>Completion</span>

          <span>{workspace.progress}%</span>

        </div>

        <div className="h-4 rounded-full bg-gray-200 overflow-hidden">

          <div
            className="h-4 bg-gradient-to-r from-cyan-500 to-blue-600"
            style={{
              width: `${workspace.progress}%`,
            }}
          />

        </div>

      </div>

      <Link
        to="/workspaces"
        className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
      >
        <ArrowLeft size={18} />
        Back to Workspaces
      </Link>

    </div>
  );
}