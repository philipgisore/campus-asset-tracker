import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default function Header({ title, subtitle }) {

  const stats = { totalAlerts: 0 };

  return (
    <header className="flex items-center justify-between mb-8">

      {/* Logo + System Name */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-600">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>

        <div>
          <h1 className="font-semibold text-lg">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">

        <ThemeToggle />

        <Link to="/alerts">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-slate-800
            hover:bg-gray-200 dark:hover:bg-slate-700"
          >
            <AlertTriangle className="h-5 w-5" />
            Alerts

            {stats.totalAlerts > 0 && (
              <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {stats.totalAlerts}
              </span>
            )}
          </button>
        </Link>

      </div>
    </header>
  );
}