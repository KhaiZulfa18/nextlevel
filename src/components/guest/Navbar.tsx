import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { IconMountain, IconPawFilled } from "@tabler/icons-react";
import { Button } from "../ui/button";

export default function Navbar() {

    return (
        <>
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-16">
            <nav className="hidden items-center gap-8 md:flex">
                <Link href="#" className="flex items-center gap-2 mr-8" prefetch={false}>
                    <IconPawFilled size={24} />
                    <span className="text-lg font-semibold">Acme Inc</span>
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary" prefetch={false}>
                Features
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary" prefetch={false}>
                Pricing
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary" prefetch={false}>
                About
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary" prefetch={false}>
                Contact
                </Link>
            </nav>
            <div className="flex items-center gap-2">
                <Button variant={'default'} size={'sm'}>Sign In</Button>
                <ThemeToggle />
            </div>
        </header>
        
        </>
    )
}