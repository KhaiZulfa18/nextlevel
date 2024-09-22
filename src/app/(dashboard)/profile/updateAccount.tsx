"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useFormState } from "react-dom";
import { updateProfile } from "./action";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

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
                <div className="flex gap-4" >
                    <Button variant={'outline'} className={`gap-2 px-6 border ${user?.isGithubConnected ? 'border-green-500 dark:border-green-500' : 'border-gray-800 dark:border-gray-300'}`}>
                        <IconBrandGithub size={20} /> {user?.isGithubConnected ? 'Connected' : 'Connect'} GitHub
                    </Button>
                    <Button variant={'outline'} className={`gap-2 px-6 border ${user?.isGoogleConnected ? 'border-green-500 dark:border-green-500' : 'border-gray-800 dark:border-gray-300'}`}>
                        <IconBrandGoogle size={20} /> {user?.isGoogleConnected ? 'Connected' : 'Connect'} Google
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}