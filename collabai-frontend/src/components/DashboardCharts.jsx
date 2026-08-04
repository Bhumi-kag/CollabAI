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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* Pie Chart */}

      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-6 hover:shadow-2xl transition">

        <h2 className="text-2xl font-bold text-slate-700 mb-6">
          📊 Task Status
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              innerRadius={55}
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

      {/* Bar Chart */}

      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-6 hover:shadow-2xl transition">

        <h2 className="text-2xl font-bold text-slate-700 mb-6">
          📈 Project Statistics
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Workspaces"
              radius={[8, 8, 0, 0]}
              fill="#2563eb"
            />

            <Bar
              dataKey="Tasks"
              radius={[8, 8, 0, 0]}
              fill="#7c3aed"
            />

            <Bar
              dataKey="Members"
              radius={[8, 8, 0, 0]}
              fill="#16a34a"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}