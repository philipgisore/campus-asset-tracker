import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default function Header({ title, subtitle }) {

  const stats = { totalAlerts: 0 };

  return (
    <header className="flex items-center justify-between pt-4 pb-4">

      {/* Logo + System Name */}
      <div className="flex items-center gap-3">
          <ShieldCheck className="text-blue-600 dark:text-blue-400 w-8 h-8" />
        
        <div>
          <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3">

        <ThemeToggle />

        <Link to="/alerts">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border
border-[oklch(0.35_0_0)]
bg-transparent
hover:bg-gray-100 dark:hover:bg-[oklch(0.22_0_0)]
text-foreground
text-sm font-medium transition-colors"
          >
            <AlertTriangle className="h-4 w-4 text-black-700 mr-2" />
            Alerts

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