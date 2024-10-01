import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/auth";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {

    const url = new URL(request.url);
	const action = url.searchParams.get("action") || "signin";

	const state = generateState();
    const codeVerifier = generateCodeVerifier();

	const authorizationUrl = await google.createAuthorizationURL(state,codeVerifier, {
        scopes: ["profile", "email"],
    });

    const redirectUri = action === "connect"
		? `${process.env.HOST_NAME}/signin/google/connect/callback`
		: `${process.env.HOST_NAME}/signin/google/callback`;

    const redirectUrl = new URL(authorizationUrl);
    redirectUrl.searchParams.set("redirect_uri", redirectUri.toString());

    console.log(redirectUrl);

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

	return Response.redirect(redirectUrl);
}
