import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default function Header({ title, subtitle }) {

  const stats = { totalAlerts: 0 };

  return (
    <header className="flex items-center justify-between pt-4 pb-4">

      {/* Logo + System Name */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ShieldCheck className="text-blue-600 dark:text-blue-400 w-7 h-7 sm:w-8 sm:h-8 shrink-0" />

        <div>
          <h1 className="font-bold text-lg sm:text-2xl text-gray-900 dark:text-white leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 sm:gap-3">

        <ThemeToggle />

        <Link to="/alerts">
          <button
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg
            border border-gray-200 dark:border-[oklch(0.3_0_0)]
            bg-transparent dark:bg-[oklch(0.30_0_0_/_0.2)]
            hover:bg-gray-100 dark:hover:bg-[oklch(0.30_0_0_/_0.3)]
            text-gray-700 dark:text-white
            text-sm font-medium transition-colors"
          >
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="hidden sm:inline">Alerts</span>

            {stats.totalAlerts > 0 && (
              <span className="ml-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                {stats.totalAlerts}
              </span>
            )}
          </button>
        </Link>

      </div>
    </header>
  );
}