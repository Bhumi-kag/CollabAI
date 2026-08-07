import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

export default function DashboardCharts({ dashboard }) {

  const pieData = [
    { name: "To Do", value: dashboard.todoTasks },
    { name: "In Progress", value: dashboard.inProgressTasks },
    { name: "Completed", value: dashboard.completedTasks },
  ];

  const barData = [
    {
      name: "Overview",
      Workspaces: dashboard.totalWorkspaces,
      Tasks: dashboard.totalTasks,
      Members: dashboard.totalMembers,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#22c55e",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-4 sm:p-6">

        <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-5">
          📊 Task Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              innerRadius={45}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-4 sm:p-6">

        <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-5">
          📈 Project Statistics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Workspaces"
              fill="#2563eb"
              radius={[8,8,0,0]}
            />

            <Bar
              dataKey="Tasks"
              fill="#7c3aed"
              radius={[8,8,0,0]}
            />

            <Bar
              dataKey="Members"
              fill="#16a34a"
              radius={[8,8,0,0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}