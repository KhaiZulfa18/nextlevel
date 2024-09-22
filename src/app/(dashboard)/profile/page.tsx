import ContentLayout from "@/components/layout/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { getUserProfile } from "./action";
import { useQuery } from "@tanstack/react-query";
import UpdateProfile from "./updateProfile";
import UpdatePassword from "./updatePassword";
import UpdateAccount from "./updateAccount";

export default async function Profile() {

    const data = await getUserProfile();

    // // const { data } = useQuery({
    // //     queryKey: ["user-profile"],
    // //     queryFn: () => getUserProfile(),
    // // })

    return (
        <ContentLayout>
            <div className="flex flex-col gap-3">
                <UpdateProfile user={data} />
                <UpdatePassword user={data} />
                <UpdateAccount user={data} />
            </div>
        </ContentLayout>
    )
}