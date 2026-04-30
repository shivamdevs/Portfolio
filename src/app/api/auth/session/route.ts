import { getServerPb } from "@/lib/pocketbase";
import { COOKIE_NAME, getAuthSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const session = await getAuthSession();

	const pb = await getServerPb();
	const isValid = pb.authStore.isValid;

	if (!isValid && session) {
		return NextResponse.json(
			{
				authenticated: false,
				user: null,
				token: null,
			},
			{
				status: 200,
				headers: {
					"Cache-Control": "no-store",
					"Set-Cookie": `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
				},
			},
		);
	}

	return NextResponse.json(
		{
			authenticated: Boolean(session) && Boolean(session?.record) &&
				Boolean(session?.token),
			user: session?.record ?? null,
			token: session?.token ?? null,
		},
		{
			headers: {
				"Cache-Control": "no-store",
			},
		},
	);
}
