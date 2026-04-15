"use client";

import { useState } from "react";

import { useAuthSession } from "@/hooks/useAuthSession";
import type { BlogComment } from "@/lib/blog/types";

type CommentSectionProps = {
	postId: string;
	initialComments: BlogComment[];
};

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
	const { isAuthenticated, isLoading } = useAuthSession();
	const [comments, setComments] = useState<BlogComment[]>(initialComments);
	const [content, setContent] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isAuthenticated || submitting) return;
		setError(null);
		setSubmitting(true);

		const response = await fetch(`/api/blogs/${postId}/comments`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content }),
		});
		const json = (await response.json().catch(() => ({}))) as {
			comment?: BlogComment;
			error?: string;
		};

		if (!response.ok || !json.comment) {
			setError(json.error ?? "Unable to submit comment.");
			setSubmitting(false);
			return;
		}

		setComments((current) => [...current, json.comment as BlogComment]);
		setContent("");
		setSubmitting(false);
	};

	return (
		<section className="mt-12 rounded-xl border border-white/12 bg-zinc-950/65 p-5 backdrop-blur">
			<h2 className="text-lg font-semibold text-zinc-100">Comments ({comments.length})</h2>
			<div className="mt-4 space-y-3">
				{comments.length === 0 ? (
					<p className="text-sm text-zinc-500">No comments yet. Be the first to add one.</p>
				) : (
					comments.map((comment) => (
						<div key={comment.id} className="rounded border border-white/10 bg-black/25 p-3">
							<div className="mb-1 flex items-center justify-between gap-2 text-xs text-zinc-500">
								<span>@{comment.author.username}</span>
								<span>{new Date(comment.created).toLocaleString()}</span>
							</div>
							<p className="text-sm whitespace-pre-wrap text-zinc-200">{comment.content}</p>
						</div>
					))
				)}
			</div>

			<form onSubmit={onSubmit} className="mt-5 space-y-3">
				<label htmlFor="comment" className="block text-xs uppercase tracking-[0.16em] text-zinc-400">
					Add comment
				</label>
				<textarea
					id="comment"
					value={content}
					onChange={(event) => setContent(event.target.value)}
					required
					minLength={1}
					maxLength={4000}
					rows={4}
					disabled={!isAuthenticated || isLoading || submitting}
					className="w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-400/60 disabled:cursor-not-allowed disabled:opacity-60"
					placeholder="Share your thoughts..."
				/>
				<button
					type="submit"
					disabled={!isAuthenticated || isLoading || submitting}
					className="inline-flex cursor-pointer items-center rounded border border-blue-400/45 bg-blue-500/15 px-4 py-2 text-sm text-blue-100 transition hover:border-blue-300/70 hover:bg-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{submitting ? "Posting..." : "Post comment"}
				</button>
				{!isAuthenticated ? (
					<p className="text-xs text-zinc-500">Sign in to comment.</p>
				) : null}
				{error ? <p className="text-xs text-red-300">{error}</p> : null}
			</form>
		</section>
	);
}
