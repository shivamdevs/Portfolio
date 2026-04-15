import type { RecordModel } from "pocketbase";

import { getServerPb } from "@/lib/pocketbase";
import {
	BLOG_POST_STATES,
	type BlogComment,
	type BlogLikeSnapshot,
	type BlogPost,
	type BlogPostState,
} from "@/lib/blog/types";
import { toSlug } from "@/lib/blog/utils";

const POSTS_COLLECTION = "blog_posts";
const COMMENTS_COLLECTION = "blog_comments";
const LIKES_COLLECTION = "blog_likes";

function estimateReadingMinutes(content: string): number {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 220));
}

function isPostState(input: string): input is BlogPostState {
	return BLOG_POST_STATES.includes(input as BlogPostState);
}

function readExpandedAuthor(record: RecordModel): BlogPost["author"] {
	const expanded = record.expand?.author as RecordModel | undefined;
	if (!expanded) {
		return {
			id: record.author as string,
			username: "unknown",
		};
	}

	return {
		id: expanded.id,
		username: String(expanded.username ?? "unknown"),
		name: expanded.name ? String(expanded.name) : undefined,
		avatarUrl: expanded.avatarUrl
			? String(expanded.avatarUrl)
			: expanded.avatar_url
			? String(expanded.avatar_url)
			: undefined,
	};
}

function mapPostRecord(record: RecordModel): BlogPost {
	const state = String(record.state ?? "draft");
	return {
		id: record.id,
		title: String(record.title ?? "Untitled"),
		slug: String(record.slug ?? ""),
		excerpt: String(record.excerpt ?? ""),
		content: String(record.content ?? ""),
		state: isPostState(state) ? state : "draft",
		authorId: String(record.author ?? ""),
		author: readExpandedAuthor(record),
		created: String(record.created),
		updated: String(record.updated),
		published: record.published ? String(record.published) : undefined,
		featured: Boolean(record.featured),
		cover: record.cover ? String(record.cover) : undefined,
		readingMinutes: record.readingMinutes
			? Number(record.readingMinutes)
			: undefined,
		updatedBy: record.updatedBy ? String(record.updatedBy) : undefined,
		lastModeratedBy: record.lastModeratedBy
			? String(record.lastModeratedBy)
			: undefined,
	};
}

function mapCommentRecord(record: RecordModel): BlogComment {
	const expanded = record.expand?.author as RecordModel | undefined;
	return {
		id: record.id,
		postId: String(record.post ?? ""),
		authorId: String(record.author ?? ""),
		author: {
			id: expanded?.id ?? String(record.author ?? ""),
			username: String(expanded?.username ?? "unknown"),
			name: expanded?.name ? String(expanded.name) : undefined,
			avatarUrl: expanded?.avatarUrl
				? String(expanded.avatarUrl)
				: expanded?.avatar_url
				? String(expanded.avatar_url)
				: undefined,
		},
		content: String(record.content ?? ""),
		created: String(record.created),
		updated: String(record.updated),
	};
}

export async function listBlogFeedPosts(
	viewerId?: string,
): Promise<BlogPost[]> {
	const pb = getServerPb();
	const filter = viewerId
		? pb.filter(`state = {:state} || author = {:authorId}`, {
			state: "published",
			authorId: viewerId,
		})
		: pb.filter(`state = {:state}`, { state: "published" });

	const records = await pb.collection(POSTS_COLLECTION).getFullList({
		filter,
		expand: "author",
		sort: "-published,-created",
	});
	return records.map(mapPostRecord);
}

export async function getPostByUsernameAndSlug(
	username: string,
	slug: string,
): Promise<BlogPost | null> {
	const pb = getServerPb();
	const author = await pb.collection("users").getFirstListItem(
		pb.filter(`username = {:username}`, { username }),
	).catch(() => null);

	if (author) {
		const record = await pb.collection(POSTS_COLLECTION).getFirstListItem(
			pb.filter(`slug = {:slug} && author = {:authorId}`, {
				slug,
				authorId: author.id,
			}),
			{ expand: "author" },
		).catch(() => null);
		if (record) {
			return mapPostRecord(record);
		}
	}

	// Fallback for username changes. If slug is globally unique we can recover and redirect to canonical URL.
	const candidates = await pb.collection(POSTS_COLLECTION).getList(1, 2, {
		filter: pb.filter(`slug = {:slug}`, { slug }),
		expand: "author",
	}).catch(() => null);

	if (!candidates || candidates.totalItems !== 1 || candidates.items.length !== 1) {
		return null;
	}

	return mapPostRecord(candidates.items[0]);
}

export async function listPublishedPosts(): Promise<BlogPost[]> {
	const pb = getServerPb();
	const records = await pb.collection(POSTS_COLLECTION).getFullList({
		filter: pb.filter(`state = {:state}`, { state: "published" }),
		expand: "author",
		sort: "-published,-created",
	});

	return records.map(mapPostRecord);
}

export async function getPostById(postId: string): Promise<BlogPost | null> {
	const pb = getServerPb();
	const record = await pb.collection(POSTS_COLLECTION).getOne(postId, {
		expand: "author",
	}).catch(() => null);
	return record ? mapPostRecord(record) : null;
}

export async function ensureUniqueSlugForAuthor(
	authorId: string,
	candidate: string,
	excludePostId?: string,
): Promise<string> {
	const pb = getServerPb();
	const base = toSlug(candidate) || "post";
	let slug = base;
	let cursor = 2;

	while (true) {
		const existing = await pb.collection(POSTS_COLLECTION).getFirstListItem(
			excludePostId
				? pb.filter(`author = {:authorId} && slug = {:slug} && id != {:excludeId}`, {
					authorId,
					slug,
					excludeId: excludePostId,
				})
				: pb.filter(`author = {:authorId} && slug = {:slug}`, {
					authorId,
					slug,
				}),
		).catch(() => null);
		if (!existing) return slug;

		slug = `${base}-${cursor}`;
		cursor += 1;
	}
}

export async function createBlogPost(input: {
	authorId: string;
	title: string;
	excerpt: string;
	content: string;
	state: BlogPostState;
	slug: string;
	updatedBy?: string;
}): Promise<BlogPost> {
	const pb = getServerPb();
	const published = input.state === "published"
		? new Date().toISOString()
		: null;
	const created = await pb.collection(POSTS_COLLECTION).create(
		{
			author: input.authorId,
			title: input.title,
			excerpt: input.excerpt,
			content: input.content,
			state: input.state,
			slug: input.slug,
			published,
			readingMinutes: estimateReadingMinutes(input.content),
			updatedBy: input.updatedBy,
		},
		{ expand: "author" },
	);

	return mapPostRecord(created);
}

export async function updateBlogPost(
	postId: string,
	input: Partial<{
		title: string;
		excerpt: string;
		content: string;
		state: BlogPostState;
		slug: string;
		updatedBy: string;
	}>,
): Promise<BlogPost> {
	const pb = getServerPb();
	const current = await getPostById(postId);
	if (!current) {
		throw new Error("Post not found");
	}

	const nextState = input.state ?? current.state;
	const data: Record<string, unknown> = {
		...input,
	};

	if (nextState === "published" && !current.published) {
		data.published = new Date().toISOString();
	}

	if (nextState === "draft") {
		data.published = null;
	}

	if (input.content) {
		data.readingMinutes = estimateReadingMinutes(input.content);
	}

	const updated = await pb.collection(POSTS_COLLECTION).update(postId, data, {
		expand: "author",
	});
	return mapPostRecord(updated);
}

export async function listPostComments(postId: string): Promise<BlogComment[]> {
	const pb = getServerPb();
	const records = await pb.collection(COMMENTS_COLLECTION).getFullList({
		filter: pb.filter(`post = {:postId}`, { postId }),
		expand: "author",
		sort: "created",
	});
	return records.map(mapCommentRecord);
}

export async function createComment(input: {
	postId: string;
	authorId: string;
	content: string;
}): Promise<BlogComment> {
	const pb = getServerPb();
	const created = await pb.collection(COMMENTS_COLLECTION).create(
		{
			post: input.postId,
			author: input.authorId,
			content: input.content,
		},
		{ expand: "author" },
	);
	return mapCommentRecord(created);
}

export async function getLikeSnapshot(
	postId: string,
	viewerId?: string,
): Promise<BlogLikeSnapshot> {
	const pb = getServerPb();
	const [count, likedByViewer] = await Promise.all([
		pb.collection(LIKES_COLLECTION).getList(1, 1, {
			filter: pb.filter(`post = {:postId} && active = true`, { postId }),
		}).then((result) => result.totalItems),
		viewerId
			? pb.collection(LIKES_COLLECTION)
				.getFirstListItem(
					pb.filter(
						`post = {:postId} && user = {:viewerId} && active = true`,
						{ postId, viewerId },
					),
				)
				.then(() => true)
				.catch(() => false)
			: Promise.resolve(false),
	]);

	return { count, likedByViewer };
}

export async function toggleLike(input: {
	postId: string;
	userId: string;
}): Promise<BlogLikeSnapshot> {
	const pb = getServerPb();
	const existing = await pb.collection(LIKES_COLLECTION).getFirstListItem(
		pb.filter(`post = {:postId} && user = {:userId}`, {
			postId: input.postId,
			userId: input.userId,
		}),
	).catch(() => null);

	if (existing) {
		const currentlyActive = Boolean(existing.active);
		await pb.collection(LIKES_COLLECTION).update(existing.id, {
			active: !currentlyActive,
		});
	} else {
		await pb.collection(LIKES_COLLECTION).create({
			post: input.postId,
			user: input.userId,
			active: true,
		});
	}

	return getLikeSnapshot(input.postId, input.userId);
}
