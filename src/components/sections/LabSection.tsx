"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const HookPulseTerminal = () => (
	<div className="mt-4 rounded-lg border border-white/8 bg-black/60 p-4 font-mono">
		<div className="mb-3 flex items-center gap-1.5">
			<span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
			<span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
			<span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
			<span className="ml-2 text-[10px] text-zinc-500">hookpulse</span>
		</div>
		<p className="text-xs text-emerald-400 mb-2">
			$ hookpulse --listen 0.0.0.0:4000
		</p>
		<div className="space-y-1 text-[11px]">
			<p>
				<span className="text-zinc-600">[12:05:11]</span>{" "}
				<span className="text-emerald-400">&#10003;</span>{" "}
				<span className="text-zinc-300">POST /events</span>{" "}
				<span className="text-zinc-500">· shopify · 200</span>
			</p>
			<p>
				<span className="text-zinc-600">[12:05:13]</span>{" "}
				<span className="text-emerald-400">&#10003;</span>{" "}
				<span className="text-zinc-300">POST /events</span>{" "}
				<span className="text-zinc-500">· stripe · 200</span>
			</p>
			<p>
				<span className="text-zinc-600">[12:05:15]</span>{" "}
				<span className="text-amber-400">⟳</span>{" "}
				<span className="text-zinc-300">POST /events</span>{" "}
				<span className="text-amber-500">· internal · retry 429</span>
			</p>
			<p className="animate-pulse">
				<span className="text-zinc-600">[12:05:18]</span>{" "}
				<span className="text-blue-400">●</span>{" "}
				<span className="text-zinc-400">listening…</span>
			</p>
		</div>
	</div>
);

const DataLakeViz = () => (
	<motion.svg
		viewBox="0 0 420 160"
		className="mt-4 h-36 w-full"
		initial={{ opacity: 0.2 }}
		whileInView={{ opacity: 1 }}
		transition={{ duration: 0.8 }}
		aria-hidden="true"
	>
		<defs>
			<linearGradient id="lake-g" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stopColor="rgb(155 125 255 / 0.2)" />
				<stop offset="60%" stopColor="rgb(155 125 255 / 0.9)" />
				<stop offset="100%" stopColor="rgb(46 168 255 / 0.8)" />
			</linearGradient>
			<filter id="glow">
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
			stroke="url(#lake-g)"
			strokeWidth="2.5"
			strokeLinecap="round"
			initial={{ pathLength: 0 }}
			whileInView={{ pathLength: 1 }}
			viewport={{ once: false, amount: 0.5 }}
			transition={{ duration: 1.6, ease: "easeInOut" }}
			filter="url(#glow)"
		/>
		{[30, 100, 180, 270, 360].map((x, i) => (
			<motion.circle
				key={x}
				cx={x}
				cy={[108, 82, 90, 55, 75][i]}
				r="4"
				fill="rgb(155 125 255)"
				initial={{ scale: 0, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 1 }}
				transition={{ delay: i * 0.18, duration: 0.3 }}
				filter="url(#glow)"
			/>
		))}
	</motion.svg>
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
					Projects & Case Studies
				</h2>
				<p className="mt-2 max-w-xl text-sm text-zinc-400">
					Infrastructure tools, data platforms, and consumer products
					— built to solve real friction.
				</p>
			</motion.div>

			<div className="mt-10 grid gap-5 sm:grid-cols-2">
				{PROJECTS.map((project, index) => (
					<motion.article
						key={project.name}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: index * 0.08 }}
						data-active="true"
						className={cn(
							"rounded-xl p-5 backdrop-blur-md transition-all duration-300",
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
									{project.name}
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
								{project.tech[0]}
							</span>
						</div>

						{/* description */}
						<p className="mt-3 text-sm leading-relaxed text-zinc-400">
							{project.description}
						</p>

						{/* terminal / svg for specific projects */}
						{project.name === "HookPulse" && <HookPulseTerminal />}
						{project.name === "Data Platform" && <DataLakeViz />}

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
