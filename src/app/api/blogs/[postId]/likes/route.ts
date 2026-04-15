import { NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import * as z from "zod";

import {
	getLikeSnapshot,
	getPostById,
	toggleLike,
} from "@/lib/blog/repository";
import { getAuthSession } from "@/lib/session";

const RouteParamsSchema = z.object({
	postId: z.string().min(1),
});

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ postId: string }> },
) {
	const parsedParams = RouteParamsSchema.safeParse(await params);
	if (!parsedParams.success) {
		return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
	}

	const post = await getPostById(parsedParams.data.postId);
	if (!post || post.state !== "published") {
		return NextResponse.json({ error: "Post not found." }, { status: 404 });
	}

	const session = await getAuthSession();
	const snapshot = await getLikeSnapshot(post.id, session?.record.id);
	return NextResponse.json(snapshot, { status: 200 });
}

export async function POST(
	_request: Request,
	{ params }: { params: Promise<{ postId: string }> },
) {
	const session = await getAuthSession();
	if (!session?.record?.id) {
		return NextResponse.json(
			{ error: "Authentication required." },
			{ status: 401 },
		);
	}

	const parsedParams = RouteParamsSchema.safeParse(await params);
	if (!parsedParams.success) {
		return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
	}

	const post = await getPostById(parsedParams.data.postId);
	if (!post || post.state !== "published") {
		return NextResponse.json({ error: "Post not found." }, { status: 404 });
	}

	try {
		const snapshot = await toggleLike({
			postId: post.id,
			userId: session.record.id,
		});
		return NextResponse.json(snapshot, { status: 200 });
	} catch (error) {
		console.error("Error toggling like:", error);
		if (error instanceof ClientResponseError) {
			return NextResponse.json(
				{ error: "Unable to update like.", details: error.message },
				{ status: error.status || 500 },
			);
		}
		return NextResponse.json(
			{ error: "Unable to update like." },
			{ status: 500 },
		);
	}
}
