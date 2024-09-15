"use server";
import { validateRequest } from "@/auth";
import DashboardLayout from "@/components/layout/dashboard-layout";
import NavbarDashboard from "@/components/layout/navbar-dashboard";
import Sidebar from "@/components/layout/sidebar";
import clsx from "clsx";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {

    const { session } = await validateRequest();

    if (!session) {
        redirect("/signin");
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}