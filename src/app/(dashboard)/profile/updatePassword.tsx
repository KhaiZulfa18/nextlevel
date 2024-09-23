"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SubmitButton from "@/components/form/SubmitButton";
import { useFormState } from "react-dom";
import { updatePassword } from "./action";
import { IconCheck, IconExclamationCircle, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpdatePassword({user} : {user: any}) {

    const [state, formAction] = useFormState(updatePassword, {
        status: '',
        message: '',
    });

    return (
        <Card className="w-full bg-background">
            <form action={formAction} autoComplete="off">
            <CardHeader>
                <CardTitle>Change Email & Password</CardTitle>
                <CardDescription>Update your email and password.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" placeholder="Email" defaultValue={user?.email || ''} autoComplete="nope"/>
                    {!user.email && (
                        <span className="text-gray-500 text-sm">No email detected. Please enter your email to use email and password login.</span>
                    )}
                    {(user.email && !user.email_verified) && (
                        <span className="text-gray-500 text-sm flex items-center space-x-1">
                            <IconExclamationCircle size={16} />
                            <span>We noticed your email isn't verified.</span>
                            <Link href="/verify-email" className="text-blue-500 hover:text-blue-600 underline transition-colors duration-200 font-medium">Click here to verify it!</Link>
                        </span>
                    )}
                </div>
                {user?.password ? (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input name="current_password" type="password" placeholder="Current Password" autoComplete="off" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new_password">New Password</Label>
                        <Input name="new_password" type="password" placeholder="New Password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm_new_password">Confirm New Password</Label>
                        <Input name="confirm_new_password" type="password" placeholder="Confirm New Password" />
                    </div>
                    </>
                ) : (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="new_password">Set New Password</Label>
                        <Input name="new_password" type="password" placeholder="Password" />
                        <span className="text-gray-500 text-sm">You can set a password for this account to use email and password login in the future.</span>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm_new_password">Confirm New Password</Label>
                        <Input name="confirm_new_password" type="password" placeholder="Confirm New Password" />
                    </div>
                    <div className="space-y-2">
                    </div>
                    </>
                )}
                {state.message && 
                    <Alert variant={ state.status === 201 ? 'success' : 'destructive'} className="">
                        { state.status === 201 ? <IconCheck size={16} /> : <IconX size={16} /> }
                        <AlertTitle >
                            { state.status === 201 ? 'Success!' : 'Error!' }
                        </AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                }
            </CardContent>
            <CardFooter>
                <SubmitButton text="Save Email & New Password" />
            </CardFooter>
            </form>
        </Card>
    )
}