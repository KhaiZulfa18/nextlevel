import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";

export default function SignInPage() {

    return (
        <Card className="p-2 md:p-6">
            <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                    Don't have an account?{" "}
                    <Link href="#" className="font-medium text-primary hover:underline" prefetch={false}>
                        Register
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter className="grid gap-2">
                <Button className="w-full">Sign in</Button>
                <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-primary">or</span>
                    <Separator className="flex-1" />
                </div>
                <Button variant="outline" className="flex place-items-center gap-2 border-gray-500">
                    <IconBrandGoogle size={16} />
                    Sign in with Google
                </Button>
                <Button variant="outline" className="flex place-items-center gap-2 border-gray-500">
                    <IconBrandGithub size={16} />
                    Sign in with GitHub
                </Button>
            </CardFooter>
        </Card>
    );
}