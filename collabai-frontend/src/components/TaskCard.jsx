import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MessageCircle,
  CalendarDays,
  FolderKanban,
  UserCircle,
  Flag,
} from "lucide-react";

import CommentModal from "./CommentModal";

import {
  updateTaskStatus,
  assignTask,
} from "../services/taskService";

import { getMembers } from "../services/memberService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function TaskCard({ task, onStatusUpdated }) {

  const [members, setMembers] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const workspace = getSelectedWorkspace();
      const data = await getMembers(workspace.id);
      setMembers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load members.");
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await updateTaskStatus(task.id, e.target.value);

      toast.success("Task status updated!");

      onStatusUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task.");
    }
  };

  const handleAssign = async (e) => {
    try {
      await assignTask(task.id, Number(e.target.value));

      toast.success("Task assigned successfully!");

      onStatusUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign member.");
    }
  };

  const statusColor = {
    TODO: "bg-orange-100 text-orange-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    DONE: "bg-green-100 text-green-700",
  };

  const priorityColor = {
    LOW: "text-green-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-red-600",
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              {task.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {task.description}
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor[task.status]}`}
          >
            {task.status}
          </span>

        </div>

        {/* Details */}

        <div className="mt-6 space-y-3 text-gray-700">

          <div className="flex items-center gap-3">
            <Flag size={18} className={priorityColor[task.priority]} />
            <span>
              <strong>Priority:</strong> {task.priority}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-cyan-600" />
            <span>
              <strong>Due:</strong> {task.dueDate}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FolderKanban size={18} className="text-violet-600" />
            <span>
              <strong>Workspace:</strong> {task.workspaceName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <UserCircle size={18} className="text-blue-600" />
            <span>
              <strong>Assigned:</strong>{" "}
              {task.assignedTo ?? "Not Assigned"}
            </span>
          </div>

        </div>

        {/* Status */}

        <div className="mt-6">

          <label className="font-semibold text-gray-700">
            Task Status
          </label>

          <select
            value={task.status}
            onChange={handleStatusChange}
            className="w-full mt-2 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>

        </div>

        {/* Assign */}

        <div className="mt-5">

          <label className="font-semibold text-gray-700">
            Assign Member
          </label>

          <select
            defaultValue=""
            onChange={handleAssign}
            className="w-full mt-2 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option
                key={member.id}
                value={member.id}
              >
                {member.fullName}
              </option>
            ))}

          </select>

        </div>

        {/* Comments */}

        <button
          onClick={() => setShowComments(true)}
          className="mt-6 w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          <MessageCircle size={18} />
          Open Comments
        </button>

      </div>

      {showComments && (
        <CommentModal
          taskId={task.id}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}