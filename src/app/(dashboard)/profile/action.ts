"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function getUserProfile() {

    const { user } = await validateRequest();

    const userProfile = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
            accounts: true
        }
    });

    const isGithubConnected = userProfile?.accounts.some(account => account.provider === 'github');
    const isGoogleConnected = userProfile?.accounts.some(account => account.provider === 'google');

    return {...userProfile, isGithubConnected, isGoogleConnected};
}