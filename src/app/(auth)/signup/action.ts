'use server';

import { revalidatePath } from "next/cache";

export async function signup(formData: FormData): Promise<Response> {
    const rawFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm_password') as string,
    }

    // Check if passwords match
    if (rawFormData.password !== rawFormData.confirmPassword) {
        // return new Response(
        //     JSON.stringify({ error: 'Passwords do not match' }), 
        //     {
        //         status: 400,
        //         headers: { 'Content-Type': 'application/json' },
        //     }
        // );
        revalidatePath('/signup?data'+JSON.stringify(rawFormData.name));
    }

    // Handle signup logic (e.g., database operations) here

    revalidatePath('/signup');
    // return Response.redirect(new URL('/signin', location.origin));
}
