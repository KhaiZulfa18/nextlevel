"use client";
import clsx from "clsx";
import NavbarDashboard from "./navbar-dashboard";
import Sidebar from "./sidebar";
import { useState } from "react";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "zustand";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";

interface Props {
    children: React.ReactNode
}

export default function DashboardLayout({children}: Props) {

    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;
  
    return (
        <>
            <AppSidebar/>
            <main
                className={clsx("w-full min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300")}
            >   
                {children}
            </main>
        </>
    )
}