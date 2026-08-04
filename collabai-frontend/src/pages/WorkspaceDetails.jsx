import { FolderKanban, Users, ClipboardList, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function WorkspaceDetails() {
  const workspace = getSelectedWorkspace();

  if (!workspace) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-white shadow p-6 text-center">

          <Users
            size={40}
            className="mx-auto text-cyan-600"
          />

          <h2 className="mt-4 text-3xl font-bold">
            0
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
            0
          </h2>

          <p className="text-gray-500">
            Tasks
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 text-center">

          <FolderKanban
            size={40}
            className="mx-auto text-green-600"
          />

          <h2 className="mt-4 text-3xl font-bold">
            Active
          </h2>

          <p className="text-gray-500">
            Status
          </p>

        </div>

      </div>

      {/* Workspace Information */}

      <div className="rounded-2xl bg-white shadow p-8">

        <h2 className="text-2xl font-bold mb-4">
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
            {workspace.ownerName || "Unknown"}
          </p>

        </div>

      </div>

      {/* Coming Soon */}

      <div className="rounded-2xl bg-white shadow p-8">

        <h2 className="text-2xl font-bold mb-4">
          Upcoming Features
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-600">
          <li>Add Tasks</li>
          <li>Invite Members</li>
          <li>Activity Timeline</li>
          <li>Workspace Settings</li>
          <li>Progress Tracking</li>
        </ul>

      </div>

      {/* Back Button */}

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