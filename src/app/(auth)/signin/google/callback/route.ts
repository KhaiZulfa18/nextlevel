import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import prisma from "@/lib/prisma";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookies().get("code_verifier")?.value ?? null;
	if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code,codeVerifier);
		
        const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
		const googleUser: GoogleUser = await googleUserResponse.json();

		// Replace this with your own DB client.
		const existingUser = await prisma.user.findFirst({ 
			where: { 
				accounts: {
					some: {
						provider: 'google',
						providerId: googleUser.sub
					}
				}
			},
			include: {
				accounts: true
			}
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

        // create new user
        const newUser = await prisma.user.create({
            data: {
                name: googleUser.name,
				username: createUsername(googleUser.name),
				email: googleUser.email,
				emailVerified: new Date(),
				accounts: {
					create : {
						provider: 'google',
						providerId: googleUser.sub
					}
				}
            },
			include: {
				accounts: true
			}
        })

		const session = await lucia.createSession(newUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		// Check if the error is an instance of OAuth2RequestError
		if (e instanceof OAuth2RequestError) {
			// Log or process specific details from the OAuth2RequestError
			console.error('OAuth2 Error:', e.message);
	
			// Return a response with a specific status and error message
			return new Response(
				JSON.stringify({ error: 'Invalid code or OAuth2 request issue.' }), // Customize the error message
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		}
	
		// Handle other types of errors
		console.error('General Error:', e);
	
		// Return a generic server error response
		return new Response(
			JSON.stringify({ error: 'An unexpected error occurred.' }), // Customize the error message
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
}

export function createUsername(name: string) {
    // Convert to lowercase
    let username = name.toLowerCase();
    // Replace spaces with underscores
    username = username.replace(/\s+/g, '_');
    // Optionally, remove other unwanted characters
    username = username.replace(/[^a-z0-9_]/g, '');
    return username;
}

interface GoogleUser {
	sub: string;
	name: string;
	email: string;
}