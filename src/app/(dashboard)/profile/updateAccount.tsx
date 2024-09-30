"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useFormState } from "react-dom";
import { updateProfile } from "./action";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle, IconX } from "@tabler/icons-react";
import Link from "next/link";

export default function UpdateAccount({user} : {user: any}) {

    const [state, formAction] = useFormState(updateProfile, {
        status: '',
        message: '',
    });

    return (
        <Card className="w-full bg-background">
            <CardHeader>
                <CardTitle>Account Providers</CardTitle>
                <CardDescription>Manage your account providers.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4 flex-wrap" >
                    <div className="relative inline-block">
                        {user?.isGithubConnected ? (
                            <>
                            <Button variant="outline" className="gap-2 px-6 border border-green-500 dark:border-green-500 font-semibold text-green-700 dark:text-green-400 shadow-md hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-800 dark:hover:text-green-300 hover:border-green-600  dark:hover:border-green-300 transition-all duration-300 ease-in-out">
                                <IconBrandGithub size={20} /> Connected Github
                            </Button>
                            <Button variant="outline" className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Disconnect GitHub">
                                <IconX size={14} />
                            </Button>
                            </>
                        ) : (
                            <Button variant={'outline'} className="gap-2 px-6 border border-gray-800 dark:border-gray-300" asChild>
                                <Link href="/signin/github?action=connect" prefetch={false}>
                                    <IconBrandGithub size={20} /> Connect to Github
                                </Link>
                            </Button>
                        ) }
                    </div>
                    <div className="relative inline-block">
                        {user?.isGoogleConnected ? (
                            <>
                            <Button variant="outline" className="gap-2 px-6 border border-green-500 dark:border-green-500 font-semibold text-green-700 dark:text-green-400 shadow-md hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-800 dark:hover:text-green-300 hover:border-green-600  dark:hover:border-green-300 transition-all duration-300 ease-in-out">
                                <IconBrandGoogle size={20} /> Connected Google
                            </Button>
                            <Button variant="outline" className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Disconnect GitHub">
                                <IconX size={14} />
                            </Button>
                            </>
                        ) : (
                            <Button variant={'outline'} className="gap-2 px-6 border border-gray-800 dark:border-gray-300" asChild>
                                <Link href="/signin/google?action=connect" prefetch={false}>
                                    <IconBrandGoogle size={20} /> Connect to Google
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}