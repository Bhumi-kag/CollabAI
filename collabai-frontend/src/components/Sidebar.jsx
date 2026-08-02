import { NavLink } from "react-router-dom";
import menuItems from "../utils/menuItems";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-8 py-8 border-b border-slate-700">

        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-cyan-400">Collab</span>
          <span className="text-white">AI</span>
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Team Collaboration Platform
        </p>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-6 space-y-3">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-lg scale-[1.02]"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-6">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm text-slate-400">
            Powered by
          </p>

          <h2 className="font-bold text-cyan-400">
            Spring Boot + React
          </h2>

        </div>

      </div>

    </aside>
  );
}