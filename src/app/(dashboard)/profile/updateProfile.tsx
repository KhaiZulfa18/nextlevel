"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SubmitButton from "@/components/form/SubmitButton";
import { useFormState } from "react-dom";
import { updateProfile } from "./action";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function UpdateProfile({user} : {user: any}) {

    const [state, formAction] = useFormState(updateProfile, {
        status: '',
        message: '',
    });

    return (
        <Card className="w-full bg-background">
            <form action={formAction}>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Make changes to your profile here. Click save when you&apos;re done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input name="username" placeholder="Username" defaultValue={user?.username} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" placeholder="Your Name" defaultValue={user?.name} />
                </div>
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
                <SubmitButton text="Save Profile Changes"/>
            </CardFooter>
            </form>
        </Card>
    )
}