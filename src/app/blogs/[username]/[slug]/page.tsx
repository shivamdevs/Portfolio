import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CommentSection } from "@/components/blog/CommentSection";
import { LikeButton } from "@/components/blog/LikeButton";
import { ShareActions } from "@/components/blog/ShareActions";
import { PageShell } from "@/components/layout/PageShell";
import { canEditPost } from "@/lib/auth/roles";
import {
	getLikeSnapshot,
	getPostByUsernameAndSlug,
	listPostComments,
} from "@/lib/blog/repository";
import { buildPostPath } from "@/lib/blog/utils";
import { SITE_BASE_URL } from "@/lib/constants";
import { getAuthSession } from "@/lib/session";

async function resolveVisiblePost(
	username: string,
	slug: string,
): Promise<Awaited<ReturnType<typeof getPostByUsernameAndSlug>>> {
	const post = await getPostByUsernameAndSlug(username, slug);
	if (!post) return null;

	if (post.state === "published") {
		return post;
	}

	const session = await getAuthSession();
	if (!canEditPost(post.authorId, session?.record)) {
		return null;
	}
	return post;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ username: string; slug: string }>;
}): Promise<Metadata> {
	const resolved = await params;
	const post = await getPostByUsernameAndSlug(
		resolved.username,
		resolved.slug,
	);

	if (!post || post.state !== "published") {
		return {
			title: "Post Not Found",
			description: "The requested post does not exist.",
			robots: { index: false, follow: false },
		};
	}

	const canonicalPath = buildPostPath(post.author.username, post.slug);
	const canonicalUrl = `${SITE_BASE_URL}${canonicalPath}`;
	const ogImage = `${SITE_BASE_URL}/blogs/${
		encodeURIComponent(post.author.username)
	}/${encodeURIComponent(post.slug)}/opengraph-image`;

	return {
		title: `${post.title} · @${post.author.username}`,
		description: post.excerpt,
		alternates: {
			canonical: canonicalPath,
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			url: canonicalUrl,
			publishedTime: post.published,
			authors: [post.author.name || post.author.username],
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: `${post.title} by ${post.author.username}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: [ogImage],
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ username: string; slug: string }>;
}) {
	const resolved = await params;
	const post = await resolveVisiblePost(resolved.username, resolved.slug);
	if (!post) {
		notFound();
	}

	if (post.state === "draft") {
		redirect(`${buildPostPath(post.author.username, post.slug)}/edit`);
	}

	const canonicalPath = buildPostPath(post.author.username, post.slug);
	const requestedPath = buildPostPath(resolved.username, resolved.slug);
	if (canonicalPath !== requestedPath) {
		permanentRedirect(canonicalPath);
	}

	const session = await getAuthSession();
	const canEdit = canEditPost(post.authorId, session?.record);
	const authenticated = Boolean(session?.record?.id);
	const showEngagement = post.state === "published";
	const canonicalUrl = `${SITE_BASE_URL}${canonicalPath}`;
	const [comments, likes] = await Promise.all([
		showEngagement ? listPostComments(post.id) : Promise.resolve([]),
		showEngagement
			? getLikeSnapshot(post.id, session?.record.id)
			: Promise.resolve({ count: 0, likedByViewer: false }),
	]);

	return (
		<PageShell breadcrumb="Blogs" accent="blue">
			<article className="mx-auto w-full rounded-xl border border-white/12 bg-zinc-950/65 p-6 backdrop-blur md:p-8">
				<h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
					{post.title}
				</h1>
				<p className="mt-3 text-base leading-relaxed text-zinc-300">
					{post.excerpt}
				</p>
				<div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
					<span>@{post.author.username}</span>
					<span>•</span>
					<span>
						{new Date(post.published ?? post.updated)
							.toLocaleString()}
					</span>
				</div>

				{canEdit
					? (
						<div className="mt-5">
							<Link
								href={`${
									buildPostPath(
										post.author.username,
										post.slug,
									)
								}/edit`}
								className="inline-flex rounded border border-amber-400/45 bg-amber-500/12 px-3 py-1.5 text-sm text-amber-100 transition hover:border-amber-300/70 hover:bg-amber-500/24"
							>
								Edit post
							</Link>
						</div>
					)
					: null}

				<div className="max-w-none mt-8 space-y-6 text-sm leading-7 text-zinc-200">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
				</div>

				{showEngagement
					? (
						<div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
							<LikeButton
								postId={post.id}
								initialCount={likes.count}
								initialLiked={likes.likedByViewer}
								authenticated={authenticated}
							/>
							<ShareActions
								url={canonicalUrl}
								title={post.title}
							/>
						</div>
					)
					: null}
			</article>

			{showEngagement
				? <CommentSection postId={post.id} initialComments={comments} />
				: null}
		</PageShell>
	);
}
