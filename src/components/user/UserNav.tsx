import { validateRequest } from "@/auth";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOut } from "@/lib/credential";
import { IconLogout } from "@tabler/icons-react";

export default async function UserNav() {
 
    const { user } = await validateRequest();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'default'} size={'sm'}>
                    {user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-1">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <form action={signOut}>
                        <Button variant={'ghost'} size={'xs'} className="flex justify-between gap-1 font-normal h-auto">
                            <IconLogout size={20} />
                            <span>Sign Out</span>
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}