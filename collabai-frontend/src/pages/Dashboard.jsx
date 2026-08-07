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
import RecentActivity from "../components/RecentActivity";
import UpcomingTasks from "../components/UpcomingTasks";

import { getDashboard } from "../services/dashboardService";
import { getProfile } from "../services/profileService";

export default function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadDashboard();
    loadProfile();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Profile Error:", error);
    }
  };

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <LoaderCircle
          className="animate-spin text-cyan-600"
          size={45}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}

      <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-5 sm:p-6 lg:p-8 text-white shadow-2xl">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          👋 Welcome Back
          {profile?.fullName ? `, ${profile.fullName}` : ""}
        </h1>

        <p className="mt-3 text-cyan-100 text-sm sm:text-base lg:text-lg">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="mt-2 text-cyan-200 text-sm sm:text-base">
          Let's make today productive 🚀
        </p>

      </div>

      {/* Overview */}

      <div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-5">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          <DashboardStats
            title="Workspaces"
            value={dashboard.totalWorkspaces}
            color="text-blue-600"
            icon={<FolderKanban color="#2563eb" />}
            route="/workspaces"
          />

          <DashboardStats
            title="Total Tasks"
            value={dashboard.totalTasks}
            color="text-violet-600"
            icon={<ClipboardList color="#7c3aed" />}
            route="/tasks"
          />

          <DashboardStats
            title="To Do"
            value={dashboard.todoTasks}
            color="text-orange-500"
            icon={<ListTodo color="#f97316" />}
            route="/tasks?status=TODO"
          />

          <DashboardStats
            title="In Progress"
            value={dashboard.inProgressTasks}
            color="text-cyan-600"
            icon={<LoaderCircle color="#0891b2" />}
            route="/tasks?status=IN_PROGRESS"
          />

          <DashboardStats
            title="Completed"
            value={dashboard.completedTasks}
            color="text-green-600"
            icon={<CheckCircle color="#16a34a" />}
            route="/tasks?status=DONE"
          />

          <DashboardStats
            title="Members"
            value={dashboard.totalMembers}
            color="text-red-500"
            icon={<Users color="#dc2626" />}
            route="/members"
          />

        </div>

      </div>

      {/* Analytics */}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 overflow-x-auto">

        <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-6">
          📊 Task Analytics
        </h2>

        <DashboardCharts dashboard={dashboard} />

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <RecentActivity />

        <UpcomingTasks />

      </div>

    </div>
  );
}