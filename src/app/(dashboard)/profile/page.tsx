import ContentLayout from "@/components/layout/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function Profile({}) {

    await sleep(2000); // Sleep for 2 seconds

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
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input id="bio" placeholder="Tell us about yourself" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" type="url" placeholder="https://example.com" />
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
                            <Input id="email" type="email" placeholder="Email" />
                        </div>
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
                            <Button variant={'outline'} className="gap-2 px-6 border border-gray-800 dark:border-gray-300">
                                <IconBrandGithub size={20} /> Connect GitHub
                            </Button>
                            <Button variant={'outline'} className="gap-2 px-6 border border-gray-800 dark:border-gray-300">
                                <IconBrandGoogle size={20} /> Connect Google
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}