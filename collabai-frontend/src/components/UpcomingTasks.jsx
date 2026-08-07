import { CalendarDays, Flag } from "lucide-react";

const upcomingTasks = [
  {
    id: 1,
    title: "Complete Dashboard UI",
    due: "Tomorrow",
    priority: "High",
  },
  {
    id: 2,
    title: "Deploy Backend",
    due: "4 Aug",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Prepare Presentation",
    due: "6 Aug",
    priority: "Low",
  },
];

export default function UpcomingTasks() {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-6">

      <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-5">
        📅 Upcoming Tasks
      </h2>

      <div className="space-y-4">

        {upcomingTasks.map((task) => (

          <div
            key={task.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-100 p-4 hover:bg-slate-50 transition"
          >

            <div className="min-w-0">

              <h3 className="font-semibold break-words">
                {task.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
                <CalendarDays size={16} />
                {task.due}
              </div>

            </div>

            <span
              className={`self-start sm:self-center px-3 py-1 rounded-full text-sm font-semibold ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <Flag size={14} className="inline mr-1" />
              {task.priority}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}