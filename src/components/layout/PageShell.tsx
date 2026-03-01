"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/interaction/CommandPalette";

type PageShellProps = {
	children: ReactNode;
	/** Label shown in the breadcrumb back-link */
	breadcrumb?: string;
	/** Accent color for the eyebrow line */
	accent?: "emerald" | "blue" | "violet" | "amber";
};

const accentLine: Record<string, string> = {
	emerald: "bg-emerald-400/60",
	blue: "bg-blue-400/60",
	violet: "bg-violet-400/60",
	amber: "bg-amber-400/60",
};

export function PageShell({
	children,
	breadcrumb,
	accent = "emerald",
}: PageShellProps) {
	return (
		<div className="relative min-h-screen bg-background text-foreground">
			{/* Fixed ambient gradient orbs */}
			<div
				className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
				aria-hidden="true"
			>
				<div className="absolute -top-60 -left-60 h-162.5 w-162.5 rounded-full bg-emerald-500/10 blur-[140px]" />
				<div className="absolute top-1/3 -right-48 h-125 w-125 rounded-full bg-blue-500/9 blur-[120px]" />
				<div className="absolute bottom-1/4 left-1/3 h-100 w-100 rounded-full bg-violet-500/8 blur-[100px]" />
				<div className="absolute bottom-0 right-1/4 h-75 w-75 rounded-full bg-amber-500/6 blur-[90px]" />
			</div>

			<Nav />

			<main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-28 md:px-10">
				{/* Back + breadcrumb */}
				{breadcrumb && (
					<div className="mb-10 flex items-center gap-3">
						<Link
							href="/"
							className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-200"
						>
							<ArrowLeft className="h-3.5 w-3.5" />
							Home
						</Link>
						<span className="text-zinc-700">/</span>
						<span className={`h-px w-5 ${accentLine[accent]}`} />
						<span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
							{breadcrumb}
						</span>
					</div>
				)}
				{children}
			</main>

			<Footer />
			<CommandPalette />
		</div>
	);
}
