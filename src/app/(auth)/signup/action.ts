'use server';

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

const prisma = new PrismaClient();

const userSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),    
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Your password and confirmation don\'t match. Please try again.',
    path: ['confirmPassword'],
});

export async function createUser(prevState: FormData,formData: FormData): Promise<Object | typeof redirect> {
    const rawFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm_password') as string,
    }

    // Validate form data
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

    const user = await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword,
        },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    redirect('/', RedirectType.push);
    // return { status: 201, message: 'User created successfully' };
}
