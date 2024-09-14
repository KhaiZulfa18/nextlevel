import { validateRequest } from "@/auth";
import Navbar from "@/components/dashboard/Navbar";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {

    const { session } = await validateRequest();

    if (!session) {
        redirect("/signin");
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}