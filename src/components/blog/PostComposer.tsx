"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { buildPostPath, summarizeContent, toSlug } from "@/lib/blog/utils";
import type { BlogPost, BlogPostState } from "@/lib/blog/types";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
	ssr: false,
});

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
	const slugPreview = initialPost?.id
		? `${initialPost.id}-${inferredSlug || "post"}`
		: inferredSlug || "post";

	const submitLabel = mode === "create" ? "Create post" : "Save changes";

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		startTransition(async () => {
			const normalizedExcerpt = excerpt.trim() || summarizeContent(content, 180);
			const payload = {
				title,
				excerpt: normalizedExcerpt,
				content,
				state,
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
		<form onSubmit={onSubmit} className="space-y-5 rounded-[28px] border border-white/10 bg-zinc-950/75 p-6 backdrop-blur-sm shadow-xl shadow-black/20">
			<div className="grid gap-4 md:grid-cols-[1.5fr_0.9fr]">
				<div>
					<label htmlFor="title" className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-400">
						Title
					</label>
					<input
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						required
						minLength={3}
						maxLength={180}
						className="w-full rounded-3xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/10"
						placeholder="Designing resilient systems at startup speed"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="state" className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-400">
						Publishing state
					</label>
					<select
						id="state"
						value={state}
						onChange={(event) => setState(event.target.value as BlogPostState)}
						className="w-full rounded-3xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/10"
					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
					<p className="text-xs text-zinc-500">
						Drafts are private until you publish them.
					</p>
				</div>
			</div>

			<div>
				<label htmlFor="excerpt" className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-400">
					Excerpt
				</label>
				<textarea
					id="excerpt"
					value={excerpt}
					onChange={(event) => setExcerpt(event.target.value)}
					rows={3}
					maxLength={320}
					className="w-full rounded-3xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/10"
					placeholder="Short summary shown on feed cards and OG previews."
				/>
			</div>

			<div>
				<label htmlFor="content" className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-400">
					Content
				</label>
				<div className="rounded-[28px] border border-white/10 bg-black/40">
					<MDEditor
						value={content}
						onChange={(value = "") => setContent(value)}
						preview="edit"
						height={420}
						textareaProps={{ placeholder: "Write in Markdown. Use headings, lists, links, and code blocks." }}
						className="min-h-105 rounded-[27px] bg-transparent text-zinc-100"
					/>
				</div>
			</div>

			<div className="rounded-3xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-xs text-zinc-400">
				<span className="font-medium text-zinc-100">Slug preview</span>
				<div className="mt-1 break-all text-sm text-zinc-300">{slugPreview}</div>
			</div>

			{error ? <p className="rounded-3xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

			<button
				type="submit"
				disabled={isPending}
				className="inline-flex items-center rounded-3xl border border-blue-400/40 bg-blue-500/15 px-5 py-3 text-sm font-medium text-blue-100 transition hover:border-blue-300/70 hover:bg-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{isPending ? "Saving..." : submitLabel}
			</button>
		</form>
	);
}
