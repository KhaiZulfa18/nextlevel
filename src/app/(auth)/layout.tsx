import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogle, IconMountain } from "@tabler/icons-react";
import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="relative flex min-h-[100dvh] flex-col items-center justify-start md:justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="mx-auto w-full max-w-md space-y-4">
                <Link href={"/"} className="flex justify-center">
                    <IconMountain size={32} />
                    <span className="ml-2 text-3xl font-mono">NextLevel</span>
                </Link>
                {children}
            </div>
        </div>
    )
}