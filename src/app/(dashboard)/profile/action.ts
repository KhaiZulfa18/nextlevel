"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {

    const { user } = await validateRequest();
    const userId = user?.id

    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            accounts: true
        }
    });

    const isGithubConnected = userProfile?.accounts.some(account => account.provider === 'github');
    const isGoogleConnected = userProfile?.accounts.some(account => account.provider === 'google');

    return {...userProfile, isGithubConnected, isGoogleConnected};
}

export async function updateProfile(prevState: FormData,formData: FormData): Promise<ActionResult> {

    const { user } = await validateRequest();
    const userId = user?.id

    const username = formData.get("username")?.toString();
    const name = formData.get("name")?.toString();

    const usernameExists = await prisma.user.findMany({
        where: {
            username: username,
            NOT: {
                id: userId
            }
        }
    });

    if(usernameExists.length > 0) {
        return { status: 400, message: 'Username has already taken, please use another username.' };
    }

    const update = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: username,
            name: name
        }
    });

    revalidatePath('/profile');
    return { status: 201, message: 'Profile updated successfully.' };
}

interface ActionResult {
    status: number;
	error?: string | null;
    message?: string | null;
}