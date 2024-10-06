import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";
import { IconMenu2, IconMountain } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { validateRequest } from "@/auth";
import { signOut } from "@/lib/credential";
import UserNav from "../layout/user-nav";


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
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-xl lg:hidden">
                            <IconMenu2 size={24} />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid gap-6 py-2">
                            <Link href="#" className="flex items-stretch gap-2" prefetch={false}>
                                <IconMountain size={24}/>
                                <span className="text-lg font-mono">NextLevel</span>
                            </Link>
                            <nav className="grid gap-4">
                                <Link href="#" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                                    Home
                                </Link>
                                <Link href="#" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                                    About
                                </Link>
                                <Link href="#" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                                    Services
                                </Link>
                                <Link href="#" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                                    Contact
                                </Link>
                            </nav>
                            {user ? (
                                <>
                                <Button variant="outline">{user.name}</Button>
                                <form action={signOut} className="w-full">
                                    <Button variant={'default'} size={'sm'} className="w-full">
                                        Sign Out 
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
                </Sheet>
                <Link href="#" prefetch={false} className="flex items-stretch gap-2">
                    <IconMountain size={24}/>
                    <span className="text-lg font-mono">NextLevel</span>
                </Link>
                <ThemeToggle/>
            </div>
        </header>
        </>
    )
}