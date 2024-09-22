"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SubmitButton from "@/components/form/SubmitButton";
import { useFormState } from "react-dom";
import { updateProfile } from "./action";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function UpdatePassword({user} : {user: any}) {

    const [state, formAction] = useFormState(updateProfile, {
        status: '',
        message: '',
    });

    return (
            <Card className="w-full bg-background">
            <CardHeader>
                <CardTitle>Change Email & Password</CardTitle>
                <CardDescription>Update your email and password.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Email" defaultValue={user?.email} />
                </div>
                {user?.password ? (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input id="current_password" type="password" placeholder="Current Password" autoComplete="off" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new_password">New Password</Label>
                        <Input id="new_password" type="password" placeholder="New Password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm_new_password">Confirm New Password</Label>
                        <Input id="confirm_new_password" type="password" placeholder="Confirm New Password" />
                    </div>
                    </>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor="password">Set Password</Label>
                        <Input id="password" type="password" placeholder="Password" />
                        <span className="text-gray-500 text-sm">You can set a password for this account to use email and password login in the future.</span>
                    </div>
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
        </Card>
    )
}