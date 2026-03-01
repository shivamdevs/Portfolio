"use client";

import { motion } from "framer-motion";
import { Zap, AlertCircle, Lightbulb, ExternalLink } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── accent maps ──────────────────────────────────── */
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
const accentLabel: Record<string, string> = {
	emerald: "text-emerald-400",
	violet: "text-violet-400",
	blue: "text-blue-400",
	amber: "text-amber-400",
};
const accentDot: Record<string, string> = {
	emerald: "bg-emerald-400",
	violet: "bg-violet-400",
	blue: "bg-blue-400",
	amber: "bg-amber-400",
};

/* ── HookPulse web dashboard preview ────────────── */
function HookPulseDashboard() {
	return (
		<div className="mt-5 rounded-lg border border-white/8 bg-zinc-950/80 overflow-hidden">
			{/* browser bar */}
			<div className="flex items-center gap-2 px-3 py-2 border-b border-white/6 bg-black/40">
				<span className="h-2 w-2 rounded-full bg-red-500/60" />
				<span className="h-2 w-2 rounded-full bg-yellow-500/60" />
				<span className="h-2 w-2 rounded-full bg-green-500/60" />
				<span className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-600">
					hookpulse.shivamdevs.com
				</span>
			</div>
			{/* column headers */}
			<div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 px-3 py-1.5 border-b border-white/5 text-[10px] text-zinc-600 uppercase tracking-wide">
				<span>Time</span>
				<span>Path</span>
				<span>Source</span>
				<span>Status</span>
			</div>
			{/* event rows */}
			{[
				{
					source: "shopify",
					path: "/webhook/order",
					status: 200,
					time: "12:05:11",
				},
				{
					source: "stripe",
					path: "/webhook/payment",
					status: 200,
					time: "12:05:13",
				},
				{
					source: "github",
					path: "/webhook/push",
					status: 200,
					time: "12:05:17",
				},
			].map((row) => (
				<div
					key={row.time}
					className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-3 py-2 text-[11px] hover:bg-white/3 border-b border-white/4 last:border-0"
				>
					<span className="text-zinc-600 font-mono">{row.time}</span>
					<span className="text-zinc-300 truncate">{row.path}</span>
					<span className="text-zinc-500">{row.source}</span>
					<span className="text-emerald-400 font-medium">
						{row.status}
					</span>
				</div>
			))}
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
				<linearGradient id="dp-g2" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="rgb(155 125 255 / 0.2)" />
					<stop offset="60%" stopColor="rgb(155 125 255 / 0.9)" />
					<stop offset="100%" stopColor="rgb(46 168 255 / 0.8)" />
				</linearGradient>
				<filter id="dp-glow2">
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
				stroke="url(#dp-g2)"
				strokeWidth="2.5"
				strokeLinecap="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 1.6, ease: "easeInOut" }}
				filter="url(#dp-glow2)"
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
					filter="url(#dp-glow2)"
				/>
			))}
		</motion.svg>
	);
}

/* ── CodePlay split editor preview ───────────────── */
function CodePlayViz() {
	return (
		<div className="mt-5 rounded-lg border border-white/8 bg-zinc-950/80 overflow-hidden">
			{/* browser bar */}
			<div className="flex items-center gap-2 px-3 py-2 border-b border-white/6 bg-black/40">
				<span className="h-2 w-2 rounded-full bg-red-500/60" />
				<span className="h-2 w-2 rounded-full bg-yellow-500/60" />
				<span className="h-2 w-2 rounded-full bg-green-500/60" />
				<span className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-600">
					codeplay.shivamdevs.com
				</span>
			</div>
			{/* split editor + preview */}
			<div className="grid grid-cols-2 divide-x divide-white/6 font-mono text-[10px]">
				<div className="p-4 space-y-1">
					<p>
						<span className="text-blue-400">&lt;div</span>{" "}
						<span className="text-zinc-500">class=</span>
						<span className="text-amber-300">&quot;card&quot;</span>
						<span className="text-blue-400">&gt;</span>
					</p>
					<p className="pl-4">
						<span className="text-blue-400">&lt;h1&gt;</span>
						<span className="text-zinc-300">Hello World</span>
						<span className="text-blue-400">&lt;/h1&gt;</span>
					</p>
					<p>
						<span className="text-blue-400">&lt;/div&gt;</span>
					</p>
					<p className="mt-2">
						<span className="text-violet-400">.card</span>{" "}
						<span className="text-zinc-600">&#123;</span>
					</p>
					<p className="pl-4">
						<span className="text-zinc-400">padding</span>
						<span className="text-zinc-600">:</span>{" "}
						<span className="text-amber-300">1rem</span>
						<span className="text-zinc-600">;</span>
					</p>
					<p className="pl-4">
						<span className="text-zinc-400">background</span>
						<span className="text-zinc-600">:</span>{" "}
						<span className="text-amber-300">#111</span>
						<span className="text-zinc-600">;</span>
					</p>
					<p>
						<span className="text-zinc-600">&#125;</span>
					</p>
				</div>
				<div className="p-4 flex items-center justify-center bg-white/2">
					<div className="rounded border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200">
						Hello World
					</div>
				</div>
			</div>
		</div>
	);
}

export default function LabPage() {
	return (
		<PageShell breadcrumb="Lab" accent="violet">
			{/* page header */}
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
					Projects I Own
				</h1>
				<p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
					Personal systems and tools built from scratch —
					infrastructure at scale, Developer Experience (DX) tooling,
					and Isolated Execution Environments. Every project reflects
					end-to-end ownership from problem to production.
				</p>
			</motion.div>

			{/* project sections */}
			<div className="space-y-16">
				{PROJECTS.map((project, index) => (
					<motion.section
						key={project.id}
						id={project.id}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.5, delay: index * 0.06 }}
					>
						{/* project header card */}
						<div
							className={cn(
								"rounded-xl p-6 backdrop-blur-md mb-8",
								accentBorder[project.accent],
								accentBg[project.accent],
							)}
						>
							<div className="flex flex-wrap items-start justify-between gap-4">
								<div className="flex-1 min-w-0">
									<div className="flex flex-wrap items-center gap-2 mb-1">
										<h2
											className={cn(
												"font-display text-xl font-semibold tracking-tight",
												accentHeading[project.accent],
											)}
										>
											{project.name}
										</h2>
										<span
											className={cn(
												"rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide font-medium",
												accentChip[project.accent],
											)}
										>
											{project.status}
										</span>
									</div>
									<p className="text-sm text-zinc-500">
										{project.type}
									</p>
								</div>
								<button
									type="button"
									disabled
									className="flex items-center gap-1.5 text-xs text-zinc-600 cursor-not-allowed"
									title="Link coming soon"
								>
									<ExternalLink className="h-3.5 w-3.5" />
									<span>View Project</span>
								</button>
							</div>

							<p className="mt-4 text-sm leading-relaxed text-zinc-300">
								{project.description}
							</p>

							{/* wow factors */}
							<div className="mt-5 flex flex-wrap gap-2">
								{project.wowFactor.map((w) => (
									<span
										key={w}
										className={cn(
											"flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium",
											accentChip[project.accent],
										)}
									>
										<Zap className="h-3 w-3" />
										{w}
									</span>
								))}
							</div>
						</div>

						{/* problem / solution + visual */}
						<div className="grid gap-6 lg:grid-cols-2 mb-8">
							{/* problem */}
							<div className="rounded-xl border border-white/6 bg-white/3 p-5 backdrop-blur-sm">
								<div className="flex items-center gap-2 mb-3">
									<AlertCircle className="h-4 w-4 text-red-400/70" />
									<p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
										The Problem
									</p>
								</div>
								<p className="text-sm leading-relaxed text-zinc-300">
									{project.problem}
								</p>
							</div>

							{/* solution */}
							<div className="rounded-xl border border-white/6 bg-white/3 p-5 backdrop-blur-sm">
								<div className="flex items-center gap-2 mb-3">
									<Lightbulb
										className={cn(
											"h-4 w-4",
											accentLabel[project.accent],
										)}
									/>
									<p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
										The Solution
									</p>
								</div>
								<p className="text-sm leading-relaxed text-zinc-300">
									{project.solution}
								</p>
							</div>
						</div>

						{/* visual previews */}
						{project.id === "hookpulse" && <HookPulseDashboard />}
						{project.id === "data-platform" && <DataPlatformViz />}
						{project.id === "codeplay" && <CodePlayViz />}

						{/* tech stack */}
						<div className="mt-6">
							<p
								className={cn(
									"text-[11px] font-medium uppercase tracking-widest mb-3",
									accentLabel[project.accent],
								)}
							>
								Stack
							</p>
							<div className="flex flex-wrap gap-2">
								{project.tech.map((t) => (
									<span
										key={t}
										className="rounded border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
									>
										{t}
									</span>
								))}
							</div>

							{/* impact line */}
							<div className="mt-5 flex items-center gap-2">
								{project.wowFactor.slice(0, 3).map((w, i) => (
									<div
										key={i}
										className="flex items-center gap-1.5 text-xs text-zinc-500"
									>
										{i > 0 && (
											<span className="text-zinc-700 select-none">
												·
											</span>
										)}
										<span
											className={cn(
												"h-1.5 w-1.5 rounded-full",
												accentDot[project.accent],
											)}
										/>
										{w}
									</div>
								))}
							</div>
						</div>
					</motion.section>
				))}
			</div>
		</PageShell>
	);
}
