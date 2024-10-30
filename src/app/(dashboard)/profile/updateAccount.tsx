"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle, IconCheck, IconExclamationCircle, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { disconnectAccount } from "./action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type MessageState = {
    status: number | null;
    message?: string | null;
    error?: string | null;
};

export default function UpdateAccount({user} : {user: any}) {
    
    const [openModal, setOpenModal] = useState(false);
    const [provider, setProvider] = useState('');
    const [message, setMessage] = useState<MessageState>({
        status: null,
        message: null,
        error: null,
    });

    const handleDisconnect = (provider: string) => {
        setProvider(provider);
        setOpenModal(true);
    }

    const deleteAccount = useCallback(async (provider: string) => {
        
        const res = await disconnectAccount(provider);
        setMessage(res);
        setOpenModal(false);

    }, []);

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
                            <Button variant="default" className="gap-2">
                                <IconBrandGithub size={20} /> Connected Github
                            </Button>
                            <Button variant="outline" className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Disconnect GitHub"
                                onClick={() => handleDisconnect('Github')}>
                                <IconX size={14} />
                            </Button>
                            </>
                        ) : (
                            <Button variant={'outline'} className="gap-2" asChild>
                                <Link href="/signin/github?action=connect" prefetch={false}>
                                    <IconBrandGithub size={20} /> Connect to Github
                                </Link>
                            </Button>
                        ) }
                    </div>
                    <div className="relative inline-block">
                        {user?.isGoogleConnected ? (
                            <>
                            <Button variant="default" className="gap-2 transition-all duration-300 ease-in-out">
                                <IconBrandGoogle size={20} /> Connected Google
                            </Button>
                            <Button variant="outline" className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label="Disconnect GitHub"
                                onClick={() => handleDisconnect('Google')}>
                                <IconX size={14} />
                            </Button>
                            </>
                        ) : (
                            <Button variant={'outline'} className="gap-2" asChild>
                                <Link href="/signin/google?action=connect" prefetch={false}>
                                    <IconBrandGoogle size={20} /> Connect to Google
                                </Link>
                            </Button>
                        )}
                    </div>
                    {message.status && 
                        <Alert variant={ message.status === 201 ? 'success' : 'destructive'} className="">
                            { message.status === 201 ? <IconCheck size={16} /> : <IconX size={16} /> }
                            <AlertTitle >
                                { message.status === 201 ? 'Success!' : 'Error!' }
                            </AlertTitle>
                            <AlertDescription>{message.message}</AlertDescription>
                        </Alert>
                    }
                </div>
                <Dialog open={openModal} onOpenChange={setOpenModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <IconExclamationCircle size={20} />
                                Disconnect {provider} Account
                            </DialogTitle>
                            <DialogDescription className="text-left">
                                Are you sure you want to disconnect your {provider} account? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-end">
                            <Button type="button" variant="secondary" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                            <Button type="button" variant="destructive" onClick={() => deleteAccount(provider)}>
                                Yes, Disconnect
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}