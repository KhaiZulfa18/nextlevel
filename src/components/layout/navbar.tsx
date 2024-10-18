import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";
import { IconBook2, IconDashboard, IconHome, IconLogout, IconLogout2, IconMenu2, IconMountain } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { validateRequest } from "@/auth";
import { signOut } from "@/lib/credential";
import UserNav from "../layout/user-nav";
import SidebarSheetGuest from "./sidebar-sheet-guest";


export default async function Navbar() {

    const { user } = await validateRequest();

    return (
        <>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 md:px-8">
            <nav className="hidden items-center gap-8 md:flex">
                <Link href="/" className="flex items-center gap-2 mr-8" prefetch={false}>
                    <IconMountain size={24} />
                    <span className="text-lg font-mono">NextLevel</span>
                </Link>
            </nav>
            <div className="hidden md:flex items-center gap-2">
                {user ? ( 
                    <UserNav />                    
                ) : ( 
                    <Button variant={'default'} size={'sm'} asChild>
                    <Link href="/signin" prefetch={false}> 
                        Sign In 
                    </Link>
                    </Button>
                )}
                <ThemeToggle />
            </div>
            <div className="md:hidden flex w-full items-center justify-between gap-2">
                {/* <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-xl lg:hidden">
                            <IconMenu2 size={24} />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <nav className="grid gap-1.5 text-lg font-medium">
                            <Link href="/" className="flex items-center gap-2 text-lg font-medium mb-4">
                                <IconMountain size={30} />
                                <span className="font-mono">NextLevel</span>
                            </Link>
                            <Link href="/" className="mx-[-0.65rem] flex items-stretch gap-4 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-50 bg-slate-300 dark:bg-gray-800">
                                <IconHome size={24} />
                                Home
                            </Link>
                            <Link href="/docs" className="mx-[-0.65rem] flex items-stretch gap-4 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-50">
                                <IconBook2 size={24} />
                                Docs
                            </Link>
                            <Link href="/dashboard" className="mx-[-0.65rem] flex items-stretch gap-4 rounded-xl px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-50">
                                <IconDashboard size={24} />
                                Dashboard
                            </Link>
                        </nav>
                        <div className="mt-auto grid gap-2 py-2">
                            {user ? (
                                <>
                                <Button variant="outline" className="rounded-xl" asChild>
                                    <Link href="/profile">{user.name}</Link>
                                </Button>
                                <form action={signOut} className="w-full">
                                    <Button variant={'default'} size={'sm'} className="w-full flex gap-2 rounded-xl">
                                        Sign Out 
                                        <IconLogout size={20} />
                                    </Button>
                                </form>
                                </>
                            ) : (
                                <Button variant={'default'} size={'sm'} asChild>
                                    <Link href="/signin" prefetch={false}> 
                                        Sign In 
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet> */}
                <SidebarSheetGuest user={user}/>
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