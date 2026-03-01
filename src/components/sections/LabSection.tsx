"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

import { PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

const accentDot: Record<string, string> = {
	emerald: "bg-emerald-400",
	violet: "bg-violet-400",
	blue: "bg-blue-400",
	amber: "bg-amber-400",
};

const HookPulseDashboard = () => (
	<div className="mt-4 rounded-lg border border-white/8 bg-zinc-950/80 overflow-hidden">
		{/* browser bar */}
		<div className="flex items-center gap-2 px-3 py-2 border-b border-white/6 bg-black/40">
			<span className="h-2 w-2 rounded-full bg-red-500/60" />
			<span className="h-2 w-2 rounded-full bg-yellow-500/60" />
			<span className="h-2 w-2 rounded-full bg-green-500/60" />
			<span className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-600">
				hookpulse.shivamdevs.com
			</span>
		</div>
		{/* event list */}
		<div className="divide-y divide-white/5 text-[11px]">
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
					className="flex items-center gap-3 px-3 py-2 hover:bg-white/3"
				>
					<span className="text-emerald-400">&#10003;</span>
					<span className="w-14 shrink-0 text-zinc-600">
						{row.time}
					</span>
					<span className="flex-1 text-zinc-300 truncate">
						{row.path}
					</span>
					<span className="text-zinc-500">{row.source}</span>
					<span className="text-emerald-400 font-medium">
						{row.status}
					</span>
				</div>
			))}
		</div>
	</div>
);

const DataPlatformViz = () => (
	<motion.svg
		viewBox="0 0 420 160"
		className="mt-4 h-32 w-full"
		initial={{ opacity: 0.2 }}
		whileInView={{ opacity: 1 }}
		transition={{ duration: 0.8 }}
		aria-hidden="true"
	>
		<defs>
			<linearGradient id="dp-g" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stopColor="rgb(155 125 255 / 0.2)" />
				<stop offset="60%" stopColor="rgb(155 125 255 / 0.9)" />
				<stop offset="100%" stopColor="rgb(46 168 255 / 0.8)" />
			</linearGradient>
			<filter id="dp-glow">
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
			stroke="url(#dp-g)"
			strokeWidth="2.5"
			strokeLinecap="round"
			initial={{ pathLength: 0 }}
			whileInView={{ pathLength: 1 }}
			viewport={{ once: false, amount: 0.5 }}
			transition={{ duration: 1.6, ease: "easeInOut" }}
			filter="url(#dp-glow)"
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
				filter="url(#dp-glow)"
			/>
		))}
	</motion.svg>
);

const CodePlayViz = () => (
	<div className="mt-4 rounded-lg border border-white/8 bg-zinc-950/80 overflow-hidden">
		{/* browser bar */}
		<div className="flex items-center gap-2 px-3 py-2 border-b border-white/6 bg-black/40">
			<span className="h-2 w-2 rounded-full bg-red-500/60" />
			<span className="h-2 w-2 rounded-full bg-yellow-500/60" />
			<span className="h-2 w-2 rounded-full bg-green-500/60" />
			<span className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-600">
				codeplay.shivamdevs.com
			</span>
		</div>
		{/* split editor */}
		<div className="grid grid-cols-2 divide-x divide-white/6 font-mono text-[10px]">
			<div className="p-3 space-y-1">
				<p>
					<span className="text-blue-400">&#60;div</span>{" "}
					<span className="text-zinc-500">class=</span>
					<span className="text-amber-300">&quot;card&quot;</span>
					<span className="text-blue-400">&gt;</span>
				</p>
				<p className="pl-3">
					<span className="text-blue-400">&#60;h1&#62;</span>
					<span className="text-zinc-300">Hello</span>
					<span className="text-blue-400">&#60;/h1&#62;</span>
				</p>
				<p>
					<span className="text-blue-400">&#60;/div&#62;</span>
				</p>
				<p className="mt-1">
					<span className="text-violet-400">.card</span>{" "}
					<span className="text-zinc-600">&#123;</span>
				</p>
				<p className="pl-3">
					<span className="text-zinc-400">padding</span>
					<span className="text-zinc-600">:</span>{" "}
					<span className="text-amber-300">1rem</span>
					<span className="text-zinc-600">;</span>
				</p>
				<p>
					<span className="text-zinc-600">&#125;</span>
				</p>
			</div>
			<div className="p-3 flex items-center justify-center">
				<div className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
					Hello
				</div>
			</div>
		</div>
	</div>
);

export function LabSection() {
	return (
		<section
			id="projects"
			className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10"
		>
			<div className="section-divider mb-16" />

			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.45 }}
			>
				<div className="flex items-center gap-2 mb-2">
					<span className="h-px w-6 bg-violet-400/60" />
					<p className="text-[11px] tracking-[0.25em] text-violet-300 uppercase font-medium">
						The Lab
					</p>
				</div>
				<h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
					Projects I Own
				</h2>
				<p className="mt-2 max-w-xl text-sm text-zinc-400">
					Personal systems and tools I&apos;ve built from scratch —
					infrastructure at scale, developer tooling, and distributed
					execution environments.
				</p>
			</motion.div>

			<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{PROJECTS.map((project, index) => (
					<motion.article
						key={project.id}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: index * 0.08 }}
						data-active="true"
						className={cn(
							"rounded-xl p-5 backdrop-blur-md transition-all duration-300 flex flex-col",
							accentBorder[project.accent],
							accentBg[project.accent],
							accentHover[project.accent],
						)}
					>
						{/* header */}
						<div className="flex items-start justify-between gap-3">
							<div>
								<h3
									className={cn(
										"text-base font-semibold",
										accentHeading[project.accent],
									)}
								>
									{project.shortLabel}
								</h3>
								<p className="text-xs text-zinc-500 mt-0.5">
									{project.type}
								</p>
							</div>
							<span
								className={cn(
									"shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide font-medium",
									accentChip[project.accent],
								)}
							>
								{project.status.split(" ")[0]}
							</span>
						</div>

						{/* visual previews */}
						{project.id === "hookpulse" && <HookPulseDashboard />}
						{project.id === "data-platform" && <DataPlatformViz />}
						{project.id === "codeplay" && <CodePlayViz />}
						{/* wow factors */}
						<ul className="mt-4 space-y-1.5 flex-1">
							{project.wowFactor.map((w) => (
								<li
									key={w}
									className="flex items-start gap-2 text-xs text-zinc-400"
								>
									<span
										className={cn(
											"mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
											accentDot[project.accent],
										)}
									/>
									{w}
								</li>
							))}
						</ul>

						{/* footer */}
						<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
							<div className="flex flex-wrap gap-1.5">
								{project.tech.slice(0, 3).map((t) => (
									<span
										key={t}
										className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
									>
										{t}
									</span>
								))}
							</div>
							<span
								className={cn(
									"flex items-center gap-1 text-[10px] font-medium",
									accentChip[project.accent]
										.split(" ")
										.slice(-1),
								)}
							>
								<Zap className="h-2.5 w-2.5" />
								{project.impact}
							</span>
						</div>
					</motion.article>
				))}
			</div>

			{/* view full CTA */}
			<div className="mt-8 flex justify-end">
				<Link
					href="/lab"
					className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-violet-300 group"
				>
					All projects & case studies
					<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</Link>
			</div>
		</section>
	);
}
