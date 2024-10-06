import { github, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import prisma from "@/lib/prisma";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	const currentSessionCookie = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const githubUserId = String(githubUser.id);

		let currentUser = null;

		if (currentSessionCookie) {
			const { user } = await lucia.validateSession(currentSessionCookie);
			currentUser = user;
		}

        const existingAccount = await prisma.account.findFirst({
            where: {
                provider: 'github',
                providerId: githubUserId
            }
        });

        if (existingAccount) {
            return new Response(null, {
                status: 302,
                headers: { 
                    Location: "/profile",
                },
            });
        }

        if (!currentUser) {
            return new Response(null, {
                status: 400,
                headers: { Location: "/signin" }
            });
        }

        await prisma.account.create({
            data: {
                provider: 'github',
                providerId: githubUserId,
                userId: currentUser.id
            }
        });

        return new Response(null, {
            status: 302,
            headers: { Location: "/profile" }
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

interface GitHubUser {
	id: string;
	login: string;
	name: string;
}