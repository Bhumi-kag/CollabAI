import {
  CheckCircle2,
  Users,
  FolderKanban,
  ClipboardList,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <ClipboardList className="text-blue-600" size={22} />,
    title: "New Task Created",
    description: "UI Design task has been created.",
    time: "5 mins ago",
  },
  {
    id: 2,
    icon: <CheckCircle2 className="text-green-600" size={22} />,
    title: "Task Completed",
    description: "Authentication module completed.",
    time: "20 mins ago",
  },
  {
    id: 3,
    icon: <Users className="text-purple-600" size={22} />,
    title: "New Member Joined",
    description: "Rahul Sharma joined the workspace.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: <FolderKanban className="text-orange-500" size={22} />,
    title: "Workspace Created",
    description: "Development Workspace created.",
    time: "Today",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">

      <h2 className="text-2xl font-bold text-slate-700 mb-6">
        🔥 Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 border-b last:border-none pb-4"
          >
            <div className="bg-slate-100 rounded-xl p-3">
              {activity.icon}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                {activity.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {activity.description}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {activity.time}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}