import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
    const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state,codeVerifier, {
        scopes: ["profile", "email"],
    });

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

    // Set the 'google_oauth_state' cookie
    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Set Secure flag in production
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });

    // Set the 'code_verifier' cookie
    cookies().set("code_verifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Set Secure flag in production
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });

	return Response.redirect(url);
}
