import { Draggable } from "@hello-pangea/dnd";
import {
  CalendarDays,
  UserCircle,
  Flag,
} from "lucide-react";

export default function KanbanTaskCard({
  task,
  index,
}) {

  const priorityColor = {
    LOW: "text-green-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-red-600",
  };

  return (

    <Draggable
      draggableId={String(task.id)}
      index={index}
    >
      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-2xl shadow-md p-5 mb-4 hover:shadow-xl transition"
        >

          <h2 className="text-lg font-bold">
            {task.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {task.description}
          </p>

          <div className="mt-5 space-y-2 text-sm">

            <div className="flex items-center gap-2">
              <Flag
                size={16}
                className={priorityColor[task.priority]}
              />
              {task.priority}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {task.dueDate}
            </div>

            <div className="flex items-center gap-2">
              <UserCircle size={16} />
              {task.assignedTo || "Unassigned"}
            </div>

          </div>

        </div>

      )}
    </Draggable>

  );
}