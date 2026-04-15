import { NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import * as z from "zod";

import {
	createComment,
	getPostById,
	listPostComments,
} from "@/lib/blog/repository";
import { BlogCommentSchema } from "@/lib/blog/types";
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

	const comments = await listPostComments(post.id);
	return NextResponse.json({ comments }, { status: 200 });
}

export async function POST(
	request: Request,
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

	let payload: z.infer<typeof BlogCommentSchema>;
	try {
		const body = (await request.json()) as unknown;
		const parsed = BlogCommentSchema.safeParse(body);
		if (!parsed.success) {
			const errors = z.flattenError(parsed.error);
			const errorMessage = Object.entries(errors.fieldErrors)
				.map(([key, value]) => `${key}: ${value.join(", ")}`)
				.join("\n");
			return NextResponse.json(
				{ error: errorMessage || "Invalid input." },
				{ status: 400 },
			);
		}
		payload = parsed.data;
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON body." },
			{ status: 400 },
		);
	}

	try {
		const comment = await createComment({
			postId: post.id,
			authorId: session.record.id,
			content: payload.content,
		});
		return NextResponse.json({ comment }, { status: 201 });
	} catch (error) {
		console.error("Error creating comment:", error);
		if (error instanceof ClientResponseError) {
			return NextResponse.json(
				{ error: "Unable to add comment.", details: error.message },
				{ status: error.status || 500 },
			);
		}
		return NextResponse.json(
			{ error: "Unable to add comment." },
			{ status: 500 },
		);
	}
}
