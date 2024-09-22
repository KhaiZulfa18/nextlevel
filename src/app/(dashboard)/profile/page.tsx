import ContentLayout from "@/components/layout/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { getUserProfile } from "./action";
import { useQuery } from "@tanstack/react-query";

export default async function Profile() {

    const data = await getUserProfile();

    // // const { data } = useQuery({
    // //     queryKey: ["user-profile"],
    // //     queryFn: () => getUserProfile(),
    // // })

    return (
        <ContentLayout>
            <div className="flex flex-col gap-3">
                <Card className="w-full bg-background">
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Make changes to your profile here. Click save when you're done.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                            <Label htmlFor="username">Name</Label>
                            <Input id="username" placeholder="Username" defaultValue={data?.username} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your Name" defaultValue={data?.name} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Profile Changes</Button>
                    </CardFooter>
                </Card>
                <Card className="w-full bg-background">
                    <CardHeader>
                        <CardTitle>Change Email & Password</CardTitle>
                        <CardDescription>Update your email and password.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Email" defaultValue={data?.email} />
                        </div>
                        {data?.password ? (
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
                    </CardContent>
                    <CardFooter>
                        <Button>Save New Password</Button>
                    </CardFooter>
                </Card>

                <Card className="w-full bg-background">
                    <CardHeader>
                        <CardTitle>Account Providers</CardTitle>
                        <CardDescription>Manage your account providers.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-4" >
                            <Button variant={'outline'} className={`gap-2 px-6 border ${data?.isGithubConnected ? 'border-green-500 dark:border-green-500' : 'border-gray-800 dark:border-gray-300'}`}>
                                <IconBrandGithub size={20} /> {data?.isGithubConnected ? 'Connected' : 'Connect'} GitHub
                            </Button>
                            <Button variant={'outline'} className={`gap-2 px-6 border ${data?.isGoogleConnected ? 'border-green-500 dark:border-green-500' : 'border-gray-800 dark:border-gray-300'}`}>
                                <IconBrandGoogle size={20} /> {data?.isGoogleConnected ? 'Connected' : 'Connect'} Google
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}