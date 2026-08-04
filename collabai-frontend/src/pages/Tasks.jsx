import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";

import { getTasksByWorkspace } from "../services/taskService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadTasks();

    const status = searchParams.get("status");

    if (status) {
      setStatusFilter(status);
    } else {
      setStatusFilter("ALL");
    }

  }, [searchParams]);

  const loadTasks = async () => {
    try {
      const workspace = getSelectedWorkspace();

      if (!workspace) {
        toast.error("Please select a workspace first.");
        return;
      }

      const data = await getTasksByWorkspace(workspace.id);

      setTasks(data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks.");
    }
  };

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  return (
    <div>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and track all your tasks.
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl transition shadow-lg"
        >
          + Create Task
        </button>

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-8">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option value="ALL">
              All Tasks
            </option>

            <option value="TODO">
              To Do
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="DONE">
              Completed
            </option>

          </select>

        </div>

      </div>

      {/* Tasks */}

      {filteredTasks.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center">

          <h2 className="text-2xl font-bold text-gray-700">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try changing the search or status filter.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              onStatusUpdated={loadTasks}
            />

          ))}

        </div>

      )}

      {/* Create Task Modal */}

      {showModal && (

        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onTaskCreated={loadTasks}
        />

      )}

    </div>
  );
}