import { NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import * as z from "zod";

import {
	createBlogPost,
	ensureUniqueSlugForAuthor,
	listBlogFeedPosts,
} from "@/lib/blog/repository";
import { CreateBlogPostSchema } from "@/lib/blog/types";
import { summarizeContent, toSlug } from "@/lib/blog/utils";
import { getAuthSession } from "@/lib/session";

export async function GET() {
	const session = await getAuthSession();
	const posts = await listBlogFeedPosts(session?.record.id);
	return NextResponse.json({ posts }, { status: 200 });
}

export async function POST(request: Request) {
	const session = await getAuthSession();
	if (!session?.record?.id) {
		return NextResponse.json(
			{ error: "Authentication required." },
			{ status: 401 },
		);
	}

	let payload: z.infer<typeof CreateBlogPostSchema>;
	try {
		const body = (await request.json()) as unknown;
		const parsed = CreateBlogPostSchema.safeParse(body);
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
		const slugCandidate = payload.slug ?? toSlug(payload.title);
		const slug = await ensureUniqueSlugForAuthor(
			session.record.id,
			slugCandidate,
		);
		const post = await createBlogPost({
			authorId: session.record.id,
			title: payload.title,
			excerpt: payload.excerpt || summarizeContent(payload.content, 180),
			content: payload.content,
			state: payload.state,
			slug,
			updatedBy: session.record.id,
		});

		return NextResponse.json({ post }, { status: 201 });
	} catch (error) {
		console.error("Error creating blog post:", JSON.stringify(error));
		if (error instanceof ClientResponseError) {
			return NextResponse.json(
				{
					error: "Unable to create blog post.",
					details: error.message,
				},
				{ status: error.status || 500 },
			);
		}
		return NextResponse.json(
			{ error: "Unable to create blog post." },
			{ status: 500 },
		);
	}
}
