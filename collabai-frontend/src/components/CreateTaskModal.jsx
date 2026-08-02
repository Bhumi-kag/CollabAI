import toast from "react-hot-toast";
import { useState } from "react";
import { createTask } from "../services/taskService";
import { getSelectedWorkspace } from "../services/workspaceService";

export default function CreateTaskModal({ onClose, onTaskCreated }) {
  const workspace = getSelectedWorkspace();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "HIGH",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        ...form,
        workspaceId: workspace.id,
      });

      toast.success("Task created successfully!");

      onTaskCreated();
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-8 w-[450px] shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Create Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
            required
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Create
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}