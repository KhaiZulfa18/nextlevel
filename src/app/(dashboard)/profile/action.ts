"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from 'bcryptjs';

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

export async function updateProfile(prevState: ActionResult,formData: FormData): Promise<ActionResult> {

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

export async function updatePassword(prevState: ActionResult,formData: FormData): Promise<ActionResult> {

    const { user } = await validateRequest();
    const userId = user?.id

    const currentPassword = formData.get("current_password")?.toString() || '';
    const confirmPassword = formData.get("confirm_new_password")?.toString() || '';
    const newPassword = formData.get("new_password")?.toString() || '';
    const email = formData.get("email")?.toString();

    // check validation 
    const validationEmail = userSchema.safeParse({
        email: email,
        password: newPassword,
        confirmPassword: confirmPassword
    });

    if(!validationEmail.success) {
        const errorMessage = validationEmail.error.issues[0].message;
        return { status: 400, message: errorMessage };
    }    

    // check email is already used on another user
    const emailExists = await prisma.user.findMany({
        where: {
            email: email,
            NOT: {
                id: userId
            }
        }
    });

    if(emailExists.length > 0) {
        return { status: 400, message: 'Email has already taken, please use another email.' };
    }

    // find user to get current password status
    const getUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    // if user password is already set
    if(getUser?.password) {

        // check if the current password is correct
        const validPassword = await bcrypt.compare(currentPassword, getUser.password);

        if(!validPassword) {
            return { status: 400, message: 'Current password is incorrect. Please try again.' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword,
                email: email,
            }
        });
    } else {

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword,
                email: email,
            }
        });
    }

    revalidatePath('/profile');
    return { status: 201, message: 'Email & Password updated successfully.' };
}

export async function disconnectAccount(provider: string): Promise<ActionResult> {
    
    const { user } = await validateRequest();
    const userId = user?.id;

    const provider_name = provider.toLowerCase();

    const getUser = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include:{
            accounts: true
        }
    });

    const isCredententialSet = (getUser?.password && getUser?.email) ? true : false;
    const anotherProviderExists = getUser?.accounts.some(account => account.provider !== provider_name);

    if(!isCredententialSet && !anotherProviderExists) {
        revalidatePath('/profile');
        return { status: 400, message: 'This account cannot be removed because it is your only sign in option. Please add another way to sign in before removing this account.' };
    }

    const removeAccount = await prisma.account.deleteMany({
        where: {
            userId: userId,
            provider: provider_name
        }
    });    
    
    revalidatePath('/profile');
    return { status: 201, message: 'Account disconnected successfully.' };
}

const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Your password and confirmation don\'t match. Please try again.',
    path: ['confirmPassword'],
});

interface ActionResult {
    status: number | null;
	error?: string | null;
    message?: string | null;
}