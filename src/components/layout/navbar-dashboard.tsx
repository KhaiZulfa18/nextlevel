import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";
import { IconChevronDown, IconMenu2, IconMountain } from "@tabler/icons-react";
import UserNav from "../layout/user-nav";
import { validateRequest } from "@/auth";
import SidebarSheet from "./sidebar-sheet";
import { SidebarMobileToggle } from "./app-sidebar-trigger";

export default async function NavbarDashboard()  {

    const { user } = await validateRequest();

    return (
        <>
        <header className="sticky top-0 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 md:px-8">
            <nav className="hidden items-center gap-8 md:flex">
                {/* <Input placeholder="Search" className="min-w-44" /> */}
            </nav>
            <div className="hidden md:flex items-center gap-2">
                <UserNav/>                    
                <ThemeToggle />
            </div>
            <div className="md:hidden flex w-full items-center justify-between gap-2">
                <SidebarMobileToggle/>
                <Link href="#" prefetch={false} className="flex items-stretch gap-2">
                    <IconMountain size={24} className="hidden md:block"/>
                    <span className="text-lg font-mono">NextLevel</span>
                </Link>
                <ThemeToggle/>
            </div>
        </header>
        </>
    )
}