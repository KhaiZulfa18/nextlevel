"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {

    const { theme, setTheme } = useTheme();

    return (
        <div className="flex gap-3 justify-end">
            <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <IconSun size={16}/> : <IconMoon size={16}/>}
            </Button>
        </div>
    )
}