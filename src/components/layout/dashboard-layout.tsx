"use server";
import clsx from "clsx";
import NavbarDashboard from "./navbar-dashboard";
import Sidebar from "./sidebar";
import { useState } from "react";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "zustand";
import AppSidebar from "./app-sidebar";
import { validateRequest } from "@/auth";

interface Props {
    children: React.ReactNode
}

export default async function DashboardLayout({children}: Props) {
    
    const { user } = await validateRequest();
    
    return (
        <>
            <AppSidebar user={user}/>
            <main
                className={clsx("w-full min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300")}
            >   
                {children}
            </main>
        </>
    )
}