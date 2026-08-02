import { User, Clock } from "lucide-react";

export default function ActivityCard({ activity }) {
  const formattedDate = new Date(activity.createdAt).toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

      <h2 className="text-lg font-semibold text-slate-800">
        {activity.action}
      </h2>

      <div className="flex items-center gap-2 mt-4 text-gray-600">
        <User size={18} />
        <span>{activity.performedBy}</span>
      </div>

      <div className="flex items-center gap-2 mt-2 text-gray-500">
        <Clock size={18} />
        <span>{formattedDate}</span>
      </div>

    </div>
  );
}