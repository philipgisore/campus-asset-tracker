import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setThemeState] = useState(
        localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const setTheme = (newTheme) => setThemeState(newTheme);
    
    return { theme, setTheme };
}