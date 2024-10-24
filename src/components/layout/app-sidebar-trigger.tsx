"use client";
import { IconChevronLeft, IconMenu2 } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { useSidebar } from "../ui/sidebar";
import clsx from "clsx";

export const SidebarMobileToggle = () => {

    const { toggleSidebar, openMobile } = useSidebar();

    return (
        <Button variant="outline" size="icon" className="rounded-xl lg:hidden" onClick={toggleSidebar}>
            <IconMenu2 
            className={clsx(
                    "h-4 w-4 transition-transform ease-in-out duration-500",
                    openMobile ? "rotate-90" : "rotate-0"
            )}/>
            <span className="sr-only">Toggle navigation menu</span>
        </Button>
    )
}

export const SidebarToggle = () => {

    const { toggleSidebar, state } = useSidebar();

    return (
        <div className={clsx("invisible md:visible absolute top-[12px] z-20", state === 'collapsed' ? '-right-[36px]' : '-right-[16px]' )}>
                <Button onClick={toggleSidebar} className="rounded-md w-8 h-8"  variant="outline" size="icon" >
                    <IconChevronLeft
                    className={clsx(
                        "h-4 w-4 transition-transform ease-in-out duration-500",
                        state === 'collapsed' ? "rotate-180" : "rotate-0"
                    )}
                    />
                </Button>
        </div>
    )
}