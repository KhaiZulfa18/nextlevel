"use client";
import clsx from "clsx";
import NavbarDashboard from "./navbar-dashboard";
import Sidebar from "./sidebar";
import { useState } from "react";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "zustand";

interface Props {
    children: React.ReactNode
}

export default function DashboardLayout({children}: Props) {

    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;
  
    return (
        <>
            <Sidebar/>
            <main
                className={clsx(
                "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-slate-600 transition-[margin-left] ease-in-out duration-300",
                    sidebar.isOpen === false ? "lg:ml-[112px]" : "md:ml-64"
                )}
            >   
                {children}
            </main>
        </>
    )
}