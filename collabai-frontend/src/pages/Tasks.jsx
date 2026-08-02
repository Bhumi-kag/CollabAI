import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";

import { getTasksByWorkspace } from "../services/taskService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    loadTasks();
  }, []);

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
      console.error("Error loading tasks:", error);
      toast.error("Failed to load tasks.");
    }
  };

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Create Task
        </button>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="ALL">All</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

      </div>

      {filteredTasks.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No tasks found.
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

      {showModal && (

        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onTaskCreated={loadTasks}
        />

      )}

    </div>
  );
}