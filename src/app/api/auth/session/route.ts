import { getAuthSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getAuthSession();

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
