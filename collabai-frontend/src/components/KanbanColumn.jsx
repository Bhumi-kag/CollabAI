import { Droppable } from "@hello-pangea/dnd";

import KanbanTaskCard from "./KanbanTaskCard";

export default function KanbanColumn({
  title,
  status,
  tasks,
}) {

  return (

    <Droppable droppableId={status}>

      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-slate-100 rounded-2xl p-5 min-h-[600px]"
        >

          <h2 className="text-2xl font-bold mb-5">

            {title}

            <span className="ml-2 bg-cyan-600 text-white rounded-full px-3 py-1 text-sm">

              {tasks.length}

            </span>

          </h2>

          {tasks.map((task, index) => (

            <KanbanTaskCard
              key={task.id}
              task={task}
              index={index}
            />

          ))}

          {provided.placeholder}

        </div>

      )}

    </Droppable>

  );

}