import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-gray-300" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}