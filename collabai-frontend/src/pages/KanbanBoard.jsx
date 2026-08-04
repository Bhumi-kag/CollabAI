import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

import KanbanColumn from "../components/KanbanColumn";

import {
  getTasksByWorkspace,
  updateTaskStatus,
} from "../services/taskService";

import { getSelectedWorkspace } from "../services/workspaceService";

export default function KanbanBoard() {

  const [tasks, setTasks] = useState([]);

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
      console.error(error);
      toast.error("Failed to load tasks.");
    }

  };

  const groupedTasks = {
    TODO: tasks.filter(task => task.status === "TODO"),
    IN_PROGRESS: tasks.filter(task => task.status === "IN_PROGRESS"),
    DONE: tasks.filter(task => task.status === "DONE"),
  };

  const handleDragEnd = async (result) => {

    if (!result.destination) return;

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    if (source === destination) return;

    try {

      await updateTaskStatus(
        Number(result.draggableId),
        destination
      );

      toast.success("Task Updated");

      loadTasks();

    } catch (error) {

      console.error(error);

      toast.error("Failed to update task.");

    }

  };

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Kanban Board
        </h1>

        <p className="text-gray-500 mt-2">
          Drag and drop tasks to update their status.
        </p>

      </div>

      <DragDropContext onDragEnd={handleDragEnd}>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <KanbanColumn
            title="📌 To Do"
            status="TODO"
            tasks={groupedTasks.TODO}
          />

          <KanbanColumn
            title="🚀 In Progress"
            status="IN_PROGRESS"
            tasks={groupedTasks.IN_PROGRESS}
          />

          <KanbanColumn
            title="✅ Done"
            status="DONE"
            tasks={groupedTasks.DONE}
          />

        </div>

      </DragDropContext>

    </div>

  );

}