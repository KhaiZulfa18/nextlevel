import { validateRequest } from "@/auth";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import clsx from "clsx";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {

    const { session } = await validateRequest();

    if (!session) {
        redirect("/signin");
    }

    const sidebar = {isOpen: true};

    return (
        <div>
            <Sidebar />
            <main
                className={clsx(
                "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-slate-500 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
                )}
            >   
                {/* <Navbar /> */}
                {children}
            </main>
        </div>
    )
}