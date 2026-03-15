import { Laptop, Users, LogIn, AlertTriangle } from "lucide-react";

const stats = [
  {
    label: "Registered Laptops",
    value: 2,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Laptop,
  },
  {
    label: "Currently Inside",
    value: 2,
    iconBg: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
    icon: Users,
  },
  {
    label: "Active Today",
    value: 0,
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: LogIn,
  },
  {
    label: "Active Alerts",
    value: 2,
    iconBg: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    icon: AlertTriangle,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-start justify-between p-3 sm:p-4 rounded-xl
          border border-gray-200 dark:border-slate-700
          bg-white dark:bg-gray-800"
        >
          {/* Left — label and number */}
          <div className="flex flex-col gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-tight">
              {stat.label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>

          {/* Right — icon */}
          <div className={`p-2 sm:p-3 rounded-xl ${stat.iconBg} shrink-0`}>
            <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
}