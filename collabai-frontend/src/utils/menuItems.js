import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  MessageSquare,
  Activity,
  User,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workspaces",
    path: "/workspaces",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Members",
    path: "/members",
    icon: Users,
  },
  {
    title: "Activity",
    path: "/activity",
    icon: Activity,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default menuItems;