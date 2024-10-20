"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { IconDots, } from "@tabler/icons-react";

export type Users = {
    username: string,
    name: string,
    email: string | null,
}

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => {

            const data = row.getValue<string | null>('email');

            if(!data)
                return null;

            const [name, domain] = data.split("@");
            const obfuscatedName = name[0] + "*".repeat(name.length - 2) + name[name.length -1];
            const obfuscatedEmail = `${obfuscatedName}@${domain}`;

            return <div className="text-left">{obfuscatedEmail}</div>;
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original
 
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                            <IconDots size={16}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.username)} >
                            Copy Username
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View User</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]