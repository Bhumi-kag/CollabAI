import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  KanbanSquare,
  Users,
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
    title: "Kanban Board",
    path: "/kanban",
    icon: KanbanSquare,
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