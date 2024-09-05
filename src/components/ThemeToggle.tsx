"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) return null;
    
    return (
        <div className="flex gap-3 justify-end">
            <Button variant={'outline'} size={'sm'} className="rounded-xl" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <IconSun size={16}/> : <IconMoon size={16}/>}
            </Button>
        </div>
    )
}