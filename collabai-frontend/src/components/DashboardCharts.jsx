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
    { name: "TODO", value: dashboard.todoTasks },
    { name: "IN PROGRESS", value: dashboard.inProgressTasks },
    { name: "DONE", value: dashboard.completedTasks },
  ];

  const barData = [
    {
      name: "Statistics",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Task Status
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
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

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Project Statistics
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="Workspaces" fill="#2563eb" />

            <Bar dataKey="Tasks" fill="#f97316" />

            <Bar dataKey="Members" fill="#16a34a" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}