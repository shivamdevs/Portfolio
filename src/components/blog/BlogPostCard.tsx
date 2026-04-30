import Link from "next/link";

import type { BlogPost } from "@/lib/blog/types";
import { buildPostPath } from "@/lib/blog/utils";

export function BlogPostCard({ post }: { post: BlogPost }) {
	const href = buildPostPath(post.author.username, post.slug);
	const stateBadge = post.state === "published"
		? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
		: "border-amber-400/40 bg-amber-500/10 text-amber-200";
	const timestamp = post.published ?? post.updated;

	return (
		<Link href={href} className="group">
			<article className="flex h-full flex-col justify-between gap-5 rounded-3xl border border-white/10 bg-zinc-950/60 p-6 transition hover:border-blue-300/40 hover:bg-zinc-900/90">
				<div className="space-y-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<span className={`inline-flex rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.24em] ${stateBadge}`}>
							{post.state}
						</span>
						<span className="text-xs text-zinc-500">@{post.author.username}</span>
					</div>
					<h2 className="text-2xl font-semibold leading-tight text-zinc-100">{post.title}</h2>
					<p className="text-sm leading-6 text-zinc-400">{post.excerpt}</p>
				</div>

				<div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
					<span>{new Date(timestamp).toLocaleDateString()}</span>
					{post.readingMinutes ? <span>{post.readingMinutes} min read</span> : null}
				</div>
			</article>
		</Link>
	);
}
