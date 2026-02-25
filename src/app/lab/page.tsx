"use client";

import { motion } from "framer-motion";
import { Terminal, Webhook, Heart, Brain, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── accent maps (same as LabSection) ─────────────── */
const accentBorder: Record<string, string> = {
	emerald: "grad-border-emerald",
	violet: "grad-border-violet",
	blue: "grad-border-blue",
	amber: "grad-border-amber",
};
const accentBg: Record<string, string> = {
	emerald: "bg-emerald-950/15",
	violet: "bg-violet-950/15",
	blue: "bg-blue-950/15",
	amber: "bg-amber-950/12",
};
const accentHover: Record<string, string> = {
	emerald: "hover:shadow-[0_4px_32px_-4px_rgb(0_208_132/0.22)]",
	violet: "hover:shadow-[0_4px_32px_-4px_rgb(155_125_255/0.22)]",
	blue: "hover:shadow-[0_4px_32px_-4px_rgb(46_168_255/0.22)]",
	amber: "hover:shadow-[0_4px_32px_-4px_rgb(245_158_11/0.22)]",
};
const accentHeading: Record<string, string> = {
	emerald: "text-emerald-200",
	violet: "text-violet-200",
	blue: "text-blue-200",
	amber: "text-amber-200",
};
const accentChip: Record<string, string> = {
	emerald: "border-emerald-400/25 bg-emerald-500/8 text-emerald-300",
	violet: "border-violet-400/25 bg-violet-500/8 text-violet-300",
	blue: "border-blue-400/25 bg-blue-500/8 text-blue-300",
	amber: "border-amber-400/25 bg-amber-500/8 text-amber-300",
};

const projectIcons: Record<string, LucideIcon> = {
	"Data Platform": Terminal,
	HookPulse: Webhook,
	"Your Forevers": Heart,
	"Mini Mindful Moments": Brain,
};

/* ── HookPulse terminal preview ──────────────────── */
function HookPulseTerminal() {
	return (
		<div className="mt-5 rounded-lg border border-white/8 bg-black/60 p-4 font-mono">
			<div className="mb-3 flex items-center gap-1.5">
				<span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
				<span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
				<span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
				<span className="ml-2 text-[10px] text-zinc-500">
					hookpulse — live
				</span>
			</div>
			<p className="text-xs text-emerald-400 mb-2">
				$ hookpulse --listen 0.0.0.0:4000
			</p>
			<div className="space-y-1 text-[11px]">
				<p>
					<span className="text-zinc-600">[12:05:11]</span>{" "}
					<span className="text-emerald-400">✓</span>{" "}
					<span className="text-zinc-300">POST /events</span>{" "}
					<span className="text-zinc-500">· shopify · 200</span>
				</p>
				<p>
					<span className="text-zinc-600">[12:05:13]</span>{" "}
					<span className="text-emerald-400">✓</span>{" "}
					<span className="text-zinc-300">POST /events</span>{" "}
					<span className="text-zinc-500">· stripe · 200</span>
				</p>
				<p>
					<span className="text-zinc-600">[12:05:15]</span>{" "}
					<span className="text-amber-400">⟳</span>{" "}
					<span className="text-zinc-300">POST /events</span>{" "}
					<span className="text-amber-500">
						· internal · retry 429
					</span>
				</p>
				<p className="animate-pulse">
					<span className="text-zinc-600">[12:05:18]</span>{" "}
					<span className="text-blue-400">●</span>{" "}
					<span className="text-zinc-400">listening…</span>
				</p>
			</div>
		</div>
	);
}

/* ── Data Platform flow viz ───────────────────────── */
function DataPlatformViz() {
	return (
		<motion.svg
			viewBox="0 0 420 160"
			className="mt-5 h-36 w-full"
			initial={{ opacity: 0.2 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="lake-g2" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="rgb(155 125 255 / 0.2)" />
					<stop offset="60%" stopColor="rgb(155 125 255 / 0.9)" />
					<stop offset="100%" stopColor="rgb(46 168 255 / 0.8)" />
				</linearGradient>
				<filter id="glow2">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			<motion.path
				d="M20 120 C 70 50, 130 140, 200 80 S 330 30, 400 70"
				fill="none"
				stroke="url(#lake-g2)"
				strokeWidth="2.5"
				strokeLinecap="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 1.6, ease: "easeInOut" }}
				filter="url(#glow2)"
			/>
			{[30, 100, 180, 270, 360].map((x, i) => (
				<motion.circle
					key={x}
					cx={x}
					cy={([108, 82, 90, 55, 75] as number[])[i]}
					r="4"
					fill="rgb(155 125 255)"
					initial={{ scale: 0, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ delay: i * 0.18, duration: 0.3 }}
					filter="url(#glow2)"
				/>
			))}
		</motion.svg>
	);
}

export default function LabPage() {
	return (
		<PageShell breadcrumb="Lab" accent="violet">
			{/* header */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
				className="mb-14"
			>
				<div className="flex items-center gap-2 mb-3">
					<span className="h-px w-6 bg-violet-400/60" />
					<p className="font-mono text-[10px] tracking-[0.3em] text-violet-400 uppercase">
						The Lab
					</p>
				</div>
				<h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
					Projects & Case Studies
				</h1>
				<p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
					Infrastructure tools, data platforms, and consumer apps —
					built to solve real friction. Every project listed here is
					shipped or in active production.
				</p>
			</motion.div>

			{/* project grid */}
			<div className="grid gap-6 sm:grid-cols-2">
				{PROJECTS.map((project, index) => {
					const Icon = projectIcons[project.name] ?? Terminal;
					return (
						<motion.article
							key={project.name}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.15 }}
							transition={{ duration: 0.5, delay: index * 0.08 }}
							className={cn(
								"rounded-xl p-6 backdrop-blur-md transition-all duration-300",
								accentBorder[project.accent],
								accentBg[project.accent],
								accentHover[project.accent],
							)}
						>
							{/* header row */}
							<div className="flex items-start justify-between gap-3">
								<div className="flex items-center gap-3">
									<div
										className={cn(
											"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
											project.accent === "emerald" &&
												"bg-emerald-500/12 text-emerald-400",
											project.accent === "violet" &&
												"bg-violet-500/12 text-violet-400",
											project.accent === "blue" &&
												"bg-blue-500/12 text-blue-400",
											project.accent === "amber" &&
												"bg-amber-500/12 text-amber-400",
										)}
									>
										<Icon className="h-4.5 w-4.5" />
									</div>
									<div>
										<h2
											className={cn(
												"font-display text-base font-semibold",
												accentHeading[project.accent],
											)}
										>
											{project.name}
										</h2>
										<p className="text-xs text-zinc-500 mt-0.5">
											{project.type}
										</p>
									</div>
								</div>
								<span
									className={cn(
										"shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide font-medium",
										accentChip[project.accent],
									)}
								>
									{project.tech[0]}
								</span>
							</div>

							{/* description — full text on detail page */}
							<p className="mt-4 text-sm leading-relaxed text-zinc-300">
								{project.description}
							</p>

							{/* visual previews */}
							{project.name === "HookPulse" && (
								<HookPulseTerminal />
							)}
							{project.name === "Data Platform" && (
								<DataPlatformViz />
							)}

							{/* tech stack */}
							<div className="mt-5 flex flex-wrap gap-1.5">
								{project.tech.map((t) => (
									<span
										key={t}
										className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
									>
										{t}
									</span>
								))}
							</div>

							{/* impact + link */}
							<div className="mt-4 flex items-center justify-between gap-3">
								<p
									className={cn(
										"text-[11px] font-medium",
										accentChip[project.accent]
											.split(" ")
											.slice(-1),
									)}
								>
									{project.impact}
								</p>
								{/* placeholder — swap for real URL when available */}
								<button
									type="button"
									disabled
									className="flex items-center gap-1 text-xs text-zinc-600 cursor-not-allowed"
									title="Link coming soon"
								>
									<ExternalLink className="h-3.5 w-3.5" />
									<span>View</span>
								</button>
							</div>
						</motion.article>
					);
				})}
			</div>
		</PageShell>
	);
}
