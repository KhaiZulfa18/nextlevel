"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub, IconBrandGoogle, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { createUser } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "@/components/button/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignUpPage() {

    const [state, formAction] = useFormState(createUser, {
        status: '',
        message: '',
    });

    return (
        <Card className="p-2 md:p-6">
            <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                    Already have an account?{" "}
                    <Link href="/signin" className="font-medium text-primary hover:underline" prefetch={false}>
                        Sign In
                    </Link>
                </CardDescription>
            </CardHeader>
            <form action={formAction}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="your name" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="me@nextlevel.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password" placeholder="your password" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input id="confirm_password" type="password" name="confirm_password" placeholder="password confirmation" required />
                </div>
                {state.message && 
                    <Alert variant="destructive">
                        <AlertTitle className="flex gap-2">
                            <IconX size={16} /> Error
                        </AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                }
            </CardContent>
            <CardFooter className="grid gap-2">
                <SubmitButton text="Sign up" className="w-full"/>
                <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-primary">or</span>
                    <Separator className="flex-1" />
                </div>
                <Button variant="outline" className="flex place-items-center gap-2 border-gray-500" asChild>
                    <Link href="/signin/google" prefetch={false}>
                        <IconBrandGoogle size={16} />
                        Sign up with Google
                    </Link>
                </Button>
                <Button variant="outline" className="flex place-items-center gap-2 border-gray-500" asChild>
                    <Link href="/signin/github" prefetch={false}>
                        <IconBrandGithub size={16} />
                        Sign up with GitHub
                    </Link>
                </Button>
            </CardFooter>
            </form>
        </Card>
    );
}