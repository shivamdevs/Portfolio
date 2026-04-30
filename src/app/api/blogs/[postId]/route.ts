import { NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import * as z from "zod";

import { canEditPost } from "@/lib/auth/roles";
import { getPostById, updateBlogPost } from "@/lib/blog/repository";
import { UpdateBlogPostSchema } from "@/lib/blog/types";
import { getAuthSession } from "@/lib/session";
import { toSlug } from "@/lib/blog/utils";

const RouteParamsSchema = z.object({
	postId: z.string().min(1),
});

export async function PATCH(
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

	let payload: z.infer<typeof UpdateBlogPostSchema>;
	try {
		const body = (await request.json()) as unknown;
		const parsed = UpdateBlogPostSchema.safeParse(body);
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
		const current = await getPostById(parsedParams.data.postId);
		if (!current) {
			return NextResponse.json({ error: "Post not found." }, { status: 404 });
		}

		if (!canEditPost(current.authorId, session.record)) {
			return NextResponse.json({ error: "Forbidden." }, { status: 403 });
		}

		let slug: string | undefined;
		if (payload.slug || payload.title) {
			const slugSource = payload.slug ?? payload.title ?? current.title;
			slug = `${current.id}-${toSlug(slugSource) || "post"}`;
		}

		const post = await updateBlogPost(current.id, {
			...payload,
			slug,
			updatedBy: session.record.id,
		});
		return NextResponse.json({ post }, { status: 200 });
	} catch (error) {
		console.error("Error updating blog post:", error);
		if (error instanceof ClientResponseError) {
			return NextResponse.json(
				{ error: "Unable to update post.", details: error.message },
				{ status: error.status || 500 },
			);
		}
		return NextResponse.json(
			{ error: "Unable to update post." },
			{ status: 500 },
		);
	}
}
