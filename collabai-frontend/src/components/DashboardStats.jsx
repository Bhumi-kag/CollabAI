import { useNavigate } from "react-router-dom";

export default function DashboardStats({
  title,
  value,
  icon,
  color,
  route,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => route && navigate(route)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white p-5 sm:p-6 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-100 opacity-30 group-hover:scale-125 transition duration-500"></div>

      <div className="relative flex items-center justify-between">

        <div className="min-w-0">

          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>

          <h2 className={`mt-3 text-3xl sm:text-4xl font-bold ${color}`}>
            {value}
          </h2>

          <p className="mt-3 text-xs text-cyan-600 font-semibold">
            Click to view →
          </p>

        </div>

        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg flex-shrink-0">
          {icon}
        </div>

      </div>
    </div>
  );
}