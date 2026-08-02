import { useEffect, useState } from "react";

import {
  FolderKanban,
  ListTodo,
  CheckCircle,
  Users,
  ClipboardList,
  LoaderCircle,
} from "lucide-react";

import DashboardStats from "../components/DashboardStats";
import DashboardCharts from "../components/DashboardCharts";

import { getDashboard } from "../services/dashboardService";

export default function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <LoaderCircle
          className="animate-spin"
          size={40}
        />
      </div>
    );
  }

  return (
    <div>

      <div className="mb-10 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white shadow-xl">

  <h1 className="text-4xl font-bold">
    👋 Welcome Back
  </h1>

  <p className="mt-3 text-cyan-100 text-lg">
    Manage your workspaces, collaborate with your team,
    and stay on top of every task.
  </p>

</div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

        <DashboardStats
          title="Workspaces"
          value={dashboard.totalWorkspaces}
          color="text-blue-600"
          icon={<FolderKanban color="#2563eb" />}
        />

        <DashboardStats
          title="Total Tasks"
          value={dashboard.totalTasks}
          color="text-violet-600"
          icon={<ClipboardList color="#7c3aed" />}
        />

        <DashboardStats
          title="To Do"
          value={dashboard.todoTasks}
          color="text-orange-500"
          icon={<ListTodo color="#f97316" />}
        />

        <DashboardStats
          title="In Progress"
          value={dashboard.inProgressTasks}
          color="text-cyan-600"
          icon={<LoaderCircle color="#0891b2" />}
        />

        <DashboardStats
          title="Completed"
          value={dashboard.completedTasks}
          color="text-green-600"
          icon={<CheckCircle color="#16a34a" />}
        />

        <DashboardStats
          title="Members"
          value={dashboard.totalMembers}
          color="text-red-500"
          icon={<Users color="#dc2626" />}
        />

      </div>

      {/* Charts */}
      <div className="mt-10">
  <DashboardCharts dashboard={dashboard} />
</div>

    </div>
  );
}