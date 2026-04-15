import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog/types";
import { buildPostPath } from "@/lib/blog/utils";

export function BlogPostCard({ post }: { post: BlogPost }) {
	const href = buildPostPath(post.author.username, post.slug);
	const stateBadge =
		post.state === "published"
			? "border-emerald-400/40 bg-emerald-500/12 text-emerald-200"
			: "border-amber-400/40 bg-amber-500/12 text-amber-200";
	const timestamp = post.publishedAt ?? post.updated;

	return (
		<Card accent={post.state === "published" ? "blue" : "amber"} className="h-full border border-white/10">
			<CardHeader>
				<div className="mb-2 flex items-center justify-between gap-3">
					<span className={`inline-flex rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${stateBadge}`}>
						{post.state}
					</span>
					<span className="text-xs text-zinc-500">@{post.author.username}</span>
				</div>
				<CardTitle className="text-xl leading-tight">
					<Link href={href} className="hover:text-blue-300 transition">
						{post.title}
					</Link>
				</CardTitle>
				<CardDescription>{post.excerpt}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
					<span>{new Date(timestamp).toLocaleDateString()}</span>
					<Link href={href} className="text-blue-300 hover:text-blue-200 transition">
						Read post
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
