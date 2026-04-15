import * as z from "zod";

export const BLOG_POST_STATES = ["draft", "published"] as const;

export type BlogPostState = (typeof BLOG_POST_STATES)[number];

export const BlogPostStateSchema = z.enum(BLOG_POST_STATES);

export const CreateBlogPostSchema = z.object({
	title: z.string().trim().min(3).max(180),
	excerpt: z.string().trim().min(12).max(320),
	content: z.string().trim().min(50).max(120000),
	slug: z.string().trim().min(3).max(180).optional(),
	state: BlogPostStateSchema.default("draft"),
});

export const UpdateBlogPostSchema = z.object({
	title: z.string().trim().min(3).max(180).optional(),
	excerpt: z.string().trim().min(12).max(320).optional(),
	content: z.string().trim().min(50).max(120000).optional(),
	slug: z.string().trim().min(3).max(180).optional(),
	state: BlogPostStateSchema.optional(),
});

export const BlogCommentSchema = z.object({
	content: z.string().trim().min(1).max(4000),
});

export interface BlogPostAuthor {
	id: string;
	username: string;
	name?: string;
	avatarUrl?: string;
}

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	state: BlogPostState;
	authorId: string;
	author: BlogPostAuthor;
	created: string;
	updated: string;
	published?: string;
	featured?: boolean;
	cover?: string;
	readingMinutes?: number;
	updatedBy?: string;
	lastModeratedBy?: string;
}

export interface BlogComment {
	id: string;
	postId: string;
	authorId: string;
	author: BlogPostAuthor;
	content: string;
	created: string;
	updated: string;
}

export interface BlogLikeSnapshot {
	count: number;
	likedByViewer: boolean;
}
