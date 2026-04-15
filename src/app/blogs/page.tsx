import Link from "next/link";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { PageShell } from "@/components/layout/PageShell";
import { buildAccountsAuthUrl, SITE_BASE_URL } from "@/lib/constants";
import { listBlogFeedPosts } from "@/lib/blog/repository";
import { getAuthSession } from "@/lib/session";

export default async function BlogsPage() {
	const session = await getAuthSession();
	const posts = await listBlogFeedPosts(session?.record.id);
	const authHref = buildAccountsAuthUrl(`${SITE_BASE_URL}/blogs`);

	return (
		<PageShell breadcrumb="Blogs" accent="blue">
			<section className="mb-10 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300/80">
						Multi-user engineering notes
					</p>
					<h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
						Blogs
					</h1>
					<p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
						Published posts are public. Your drafts also appear here
						while signed in.
					</p>
				</div>
				<div>
					{session?.record?.id
						? (
							<Link
								href="/blogs/new"
								className="inline-flex items-center rounded border border-blue-400/45 bg-blue-500/12 px-4 py-2 text-sm text-blue-100 transition hover:border-blue-300/70 hover:bg-blue-500/24"
							>
								Write a post
							</Link>
						)
						: (
							<Link
								href={authHref}
								className="inline-flex items-center rounded border border-white/20 bg-white/5 px-4 py-2 text-sm text-zinc-100 transition hover:border-white/40"
							>
								Sign in to write
							</Link>
						)}
				</div>
			</section>

			{posts.length === 0
				? (
					<div className="rounded-xl border border-white/10 bg-zinc-950/45 p-8 text-center">
						<p className="text-zinc-300">No posts yet.</p>
						<p className="mt-2 text-sm text-zinc-500">
							Create the first post to bootstrap the feed.
						</p>
					</div>
				)
				: (
					<div className="grid gap-5 md:grid-cols-2">
						{posts.map((post) => (
							<BlogPostCard key={post.id} post={post} />
						))}
					</div>
				)}
		</PageShell>
	);
}
