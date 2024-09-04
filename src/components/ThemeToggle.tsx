"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {

    const { theme, setTheme } = useTheme();

    return (
        <div className="flex gap-3 justify-end">
            <button className="py-1 px-2 bg-violet-400 rounded-md" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>
        </div>
    )
}