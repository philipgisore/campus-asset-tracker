import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[oklch(0.30_0_0_/_0.5)]"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-gray-300" />
      ) : (
        <Moon className="h-4 w-4 text-black-400" />
      )}
    </button>
  );
}