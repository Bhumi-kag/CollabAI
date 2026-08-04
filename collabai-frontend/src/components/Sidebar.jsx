import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import menuItems from "../utils/menuItems";

export default function Sidebar({
  mobile = false,
  closeSidebar = () => {},
}) {
  return (
    <aside
      className={`
        bg-gradient-to-b
        from-slate-900
        via-slate-800
        to-slate-900
        text-white
        flex
        flex-col
        shadow-2xl
        h-screen

        ${mobile ? "w-72" : "w-72"}
      `}
    >
      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-700 flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-extrabold tracking-wide">
            <span className="text-cyan-400">Collab</span>
            <span className="text-white">AI</span>
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Team Collaboration Platform
          </p>

        </div>

        {mobile && (
          <button
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X size={28} />
          </button>
        )}

      </div>

      {/* Menu */}

      <nav className="flex-1 p-6 space-y-3 overflow-y-auto">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-lg"
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