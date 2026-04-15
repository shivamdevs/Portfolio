"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

type LikeButtonProps = {
	postId: string;
	initialCount: number;
	initialLiked: boolean;
	authenticated: boolean;
};

export function LikeButton({
	postId,
	initialCount,
	initialLiked,
	authenticated,
}: LikeButtonProps) {
	const [count, setCount] = useState(initialCount);
	const [liked, setLiked] = useState(initialLiked);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onToggle = async () => {
		if (!authenticated || isLoading) return;
		setError(null);
		setIsLoading(true);
		const response = await fetch(`/api/blogs/${postId}/likes`, {
			method: "POST",
		});
		const json = (await response.json().catch(() => ({}))) as {
			count?: number;
			likedByViewer?: boolean;
			error?: string;
		};

		if (!response.ok) {
			setError(json.error ?? "Unable to update like right now.");
			setIsLoading(false);
			return;
		}

		setCount(json.count ?? count);
		setLiked(Boolean(json.likedByViewer));
		setIsLoading(false);
	};

	return (
		<div className="space-y-2">
			<button
				type="button"
				onClick={onToggle}
				disabled={!authenticated || isLoading}
				className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-blue-400/50 hover:text-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
			>
				<Heart className={`h-4 w-4 ${liked ? "fill-current text-red-300" : "text-zinc-400"}`} />
				<span>{count}</span>
				<span>{liked ? "Liked" : "Like"}</span>
			</button>
			{!authenticated ? (
				<p className="text-xs text-zinc-500">Sign in to like this post.</p>
			) : null}
			{error ? <p className="text-xs text-red-300">{error}</p> : null}
		</div>
	);
}
