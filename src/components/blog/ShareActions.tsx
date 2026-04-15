"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

type ShareActionsProps = {
	url: string;
	title: string;
};

export function ShareActions({ url, title }: ShareActionsProps) {
	const [message, setMessage] = useState<string | null>(null);

	const onShare = async () => {
		setMessage(null);
		if (navigator.share) {
			try {
				await navigator.share({
					title,
					url,
				});
				setMessage("Shared.");
				return;
			} catch {
				setMessage("Share cancelled.");
				return;
			}
		}

		await navigator.clipboard.writeText(url);
		setMessage("Link copied to clipboard.");
	};

	return (
		<div className="space-y-2">
			<button
				type="button"
				onClick={onShare}
				className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-blue-400/50 hover:text-blue-200"
			>
				<Share2 className="h-4 w-4" />
				Share
			</button>
			{message ? <p className="text-xs text-zinc-500">{message}</p> : null}
		</div>
	);
}
