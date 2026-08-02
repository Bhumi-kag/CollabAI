export default function DashboardStats({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100 p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Decorative Background Circle */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-cyan-50 rounded-full opacity-80"></div>

      <div className="relative flex justify-between items-center">

        <div>

          <p className="text-gray-500 font-medium text-sm tracking-wide">
            {title}
          </p>

          <h2 className={`text-5xl font-extrabold mt-4 ${color}`}>
            {value}
          </h2>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center shadow-md">

          <div className="scale-125">
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
}