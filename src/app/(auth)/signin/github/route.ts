import { generateState } from "arctic";
import { github } from "@/auth";
import { cookies } from "next/headers";
import { stat } from "fs";

export async function GET(request: Request): Promise<Response> {

	const url = new URL(request.url);
	const action = url.searchParams.get("action") || "signin";

	const state = generateState();

	let authorizationUrl = await github.createAuthorizationURL(state);

	// Dynamically determine redirect URI based on the action
	const redirectUri = action === "connect"
		? `${process.env.HOST_NAME}/signin/github/callback?action=connect`
		: `${process.env.HOST_NAME}/signin/github/callback`;

	const redirectUrl = new URL(authorizationUrl);
	redirectUrl.searchParams.append("redirect_uri", redirectUri);

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return Response.redirect(redirectUrl.toString());
}
