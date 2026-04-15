import { ImageResponse } from "next/og";

import { getPostByUsernameAndSlug } from "@/lib/blog/repository";

export const runtime = "edge";

export const alt = "Blog post preview";
export const size = {
	width: 1200,
	height: 630,
};

export default async function OpenGraphImage({
	params,
}: {
	params: Promise<{ username: string; slug: string }>;
}) {
	const resolved = await params;
	const post = await getPostByUsernameAndSlug(resolved.username, resolved.slug);
	const title = post?.title ?? "ShivamDevs Blog";
	const excerpt = post?.excerpt ?? "Systems, data engines, and engineering notes.";
	const author = post?.author.username ?? resolved.username;

	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					background: "radial-gradient(circle at top right, #123a63 0%, #05070d 48%, #020309 100%)",
					padding: "58px",
					color: "#e5e7eb",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ fontSize: 30, letterSpacing: 2, textTransform: "uppercase", color: "#93c5fd" }}>
					ShivamDevs Blog
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700, maxWidth: "1040px" }}>
						{title}
					</div>
					<div style={{ fontSize: 32, lineHeight: 1.35, color: "#cbd5e1", maxWidth: "980px" }}>
						{excerpt}
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#94a3b8" }}>
					<div>@{author}</div>
					<div>systems • scale • execution</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
