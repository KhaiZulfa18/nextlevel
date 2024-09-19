'use server';

import { PrismaClient } from "@prisma/client"
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import prisma from "@/lib/prisma";

export async function signIn(prevState: FormData, formData: FormData): Promise<ActionResult> {
    
    const rawFormData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const hashedPassword = await bcrypt.hash(rawFormData.password, 10);

    const user = await prisma.user.findFirst({
        where: { 
            email: rawFormData.email,
        },
    });

    const userPassword = user?.password;

    if(!user || !userPassword || !(await bcrypt.compare(rawFormData.password, userPassword))) {
        return { status: 400, message: 'Invalid email or password.' };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    redirect('/', RedirectType.push);
}


export async function signUp(prevState: FormData, formData: FormData): Promise<ActionResult> {
    const rawFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm_password') as string,
    }

    const validationResult = userSchema.safeParse(rawFormData);

    if(!validationResult.success) {
        const errorMessage = validationResult.error.issues[0].message;
        return { status: 400, message: errorMessage };
    }

    const existingUser = await prisma.user.findFirst({
        where: { email: rawFormData.email },
    });

    if(existingUser) {
        return { status: 400, message: 'This email address is already in use. Please try logging in or use a different email.' };
    }

    const hashedPassword = await bcrypt.hash(rawFormData.password, 10);

    const username = await createUsername(rawFormData.name);

    const user = await prisma.user.create({
        data: {
            name: rawFormData.name,
            username: username,
            email: rawFormData.email,
            password: hashedPassword,
        },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    redirect('/', RedirectType.push);
}

export async function signOut(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();    
	if (!session) {
		return {
            status: 401,
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/signin");
}

export async function createUsername(name: string) {
    let username = name.toLowerCase();
    username = username.replace(/\s+/g, '');
    username = username.replace(/[^a-z0-9_]/g, '');

    let existingUser = await prisma.user.findFirst({
        where: { username },
    });

    const baseUsername = username;

    while (existingUser) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        username = `${baseUsername}${randomNumber}`;
        
        existingUser = await prisma.user.findFirst({
            where: { username },
        });
    }

    return username;
}

const userSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),    
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Your password and confirmation don\'t match. Please try again.',
    path: ['confirmPassword'],
});

interface ActionResult {
    status: number;
	error?: string | null;
    message?: string | null;
}