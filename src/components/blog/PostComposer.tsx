"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { buildPostPath, summarizeContent, toSlug } from "@/lib/blog/utils";
import type { BlogPost, BlogPostState } from "@/lib/blog/types";

type PostComposerProps = {
	mode: "create" | "edit";
	postId?: string;
	initialPost?: BlogPost;
};

export function PostComposer({ mode, postId, initialPost }: PostComposerProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [title, setTitle] = useState(initialPost?.title ?? "");
	const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
	const [content, setContent] = useState(initialPost?.content ?? "");
	const [state, setState] = useState<BlogPostState>(initialPost?.state ?? "draft");
	const [error, setError] = useState<string | null>(null);

	const inferredSlug = useMemo(() => toSlug(title || "post"), [title]);

	const submitLabel = mode === "create" ? "Create post" : "Save changes";

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		startTransition(async () => {
			const normalizedExcerpt = excerpt.trim() || summarizeContent(content, 180);
			const payload = {
				title,
				excerpt: normalizedExcerpt,
				content,
				state,
				slug: inferredSlug,
			};

			const endpoint = mode === "create" ? "/api/blogs" : `/api/blogs/${postId}`;
			const method = mode === "create" ? "POST" : "PATCH";

			const response = await fetch(endpoint, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const json = (await response.json().catch(() => ({}))) as {
				error?: string;
				post?: BlogPost;
			};

			if (!response.ok || !json.post) {
				setError(json.error ?? "Unable to save post.");
				return;
			}

			router.push(buildPostPath(json.post.author.username, json.post.slug));
			router.refresh();
		});
	};

	return (
		<form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-white/12 bg-zinc-950/65 p-6 backdrop-blur">
			<div>
				<label htmlFor="title" className="mb-2 block text-xs uppercase tracking-[0.16em] text-zinc-400">
					Title
				</label>
				<input
					id="title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					required
					minLength={3}
					maxLength={180}
					className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60"
					placeholder="Designing resilient systems at startup speed"
				/>
			</div>

			<div>
				<label htmlFor="state" className="mb-2 block text-xs uppercase tracking-[0.16em] text-zinc-400">
					Publishing state
				</label>
				<select
					id="state"
					value={state}
					onChange={(event) => setState(event.target.value as BlogPostState)}
					className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>

			<div>
				<label htmlFor="excerpt" className="mb-2 block text-xs uppercase tracking-[0.16em] text-zinc-400">
					Excerpt
				</label>
				<textarea
					id="excerpt"
					value={excerpt}
					onChange={(event) => setExcerpt(event.target.value)}
					rows={3}
					maxLength={320}
					className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60"
					placeholder="Short summary shown on feed cards and OG previews."
				/>
			</div>

			<div>
				<label htmlFor="content" className="mb-2 block text-xs uppercase tracking-[0.16em] text-zinc-400">
					Content
				</label>
				<textarea
					id="content"
					value={content}
					onChange={(event) => setContent(event.target.value)}
					required
					minLength={50}
					rows={14}
					className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 font-mono text-sm leading-relaxed text-zinc-100 outline-none transition focus:border-blue-400/60"
					placeholder="Write in plain text or Markdown."
				/>
			</div>

			<p className="text-xs text-zinc-500">URL slug preview: {inferredSlug || "post"}</p>

			{error ? <p className="rounded border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}

			<button
				type="submit"
				disabled={isPending}
				className="inline-flex cursor-pointer items-center rounded border border-blue-400/45 bg-blue-500/15 px-4 py-2 text-sm text-blue-100 transition hover:border-blue-300/70 hover:bg-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{isPending ? "Saving..." : submitLabel}
			</button>
		</form>
	);
}
