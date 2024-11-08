"use client";
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { IconAlignLeft, IconChevronLeft, IconMountain } from "@tabler/icons-react";
import clsx from "clsx";
import MenuItems from "./menu-items";
import { useMenuItems } from "@/utils/menu";
import { useState } from "react";
import SidebarToggle from "./sidebar-toggle";
import { useStore } from "zustand";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function Sidebar({}) {

    const menuItems = useMenuItems();

    const sidebar = useStore(useSidebarToggle, (state) => state);
  
    if(!sidebar) return null;  

    return (
        <aside
            className={clsx("fixed top-0 left-0 z-20 h-screen -translate-x-full md:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-20" : "w-64"
            )}
            >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative h-full flex flex-col px-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <div className="px-1 h-14 border-b flex items-center space-x-2 justify-center">
                    <IconMountain size={24}/>
                    {sidebar?.isOpen && <span className="font-mono">NextLevel</span> }
                </div>
                <nav className="flex-1 overflow-y-auto py-4 px-1">
                    {menuItems.map((item, index) => (
                        <MenuItems key={index} item={item} isSidebarOpen={sidebar?.isOpen} />
                    ))}
                </nav>
            </div>
        </aside>
    )
}