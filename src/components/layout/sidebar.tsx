"use client";
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { IconAlignLeft, IconMountain } from "@tabler/icons-react";
import clsx from "clsx";
import MenuItems from "./menu-items";

export default function Sidebar({}) {

    const menu = [
        {label: "Home", href: "/", },
        {label: "Profile", href: "/", children : [
            {label: "Profile", href: "/profile"},
        ]},
    ];

    return (
        <aside
            className={"fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 w-64"}
            >
            <div className="relative h-full flex flex-col px-3 py-6 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <div className="px-4 py-4 border-b flex items-center space-x-2 justify-center">
                    <IconMountain size={24}/>
                    <span className="font-mono">NextLevel</span>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                    {menu.map((item, index) => (
                        <MenuItems key={index} item={item} />
                    ))}
                </nav>
            </div>
        </aside>
    )
}