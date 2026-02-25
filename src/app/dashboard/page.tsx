"use client";

import { motion } from "framer-motion";
import { Server, Database, Monitor, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { CORE_SKILLS, DASHBOARD_CARDS, SYSTEM_METRICS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── accent helpers ───────────────────────────────── */
const accentText: Record<string, string> = {
	emerald: "text-emerald-300",
	blue: "text-blue-300",
	violet: "text-violet-300",
	amber: "text-amber-300",
};
const accentBorder: Record<string, string> = {
	emerald: "border-emerald-400/30 bg-emerald-500/10",
	blue: "border-blue-400/30 bg-blue-500/10",
	violet: "border-violet-400/30 bg-violet-500/10",
	amber: "border-amber-400/30 bg-amber-500/10",
};

/* ── skill categories ─────────────────────────────── */
const SKILL_CATEGORIES: {
	label: string;
	accent: string;
	Icon: LucideIcon;
	skills: readonly string[];
}[] = [
	{
		label: "Infrastructure",
		accent: "emerald",
		Icon: Server,
		skills: [
			"AWS",
			"EKS",
			"Docker",
			"CI/CD",
			"VPC",
			"FinOps",
			"GitHub Actions",
			"Terraform",
		],
	},
	{
		label: "Data & Backend",
		accent: "violet",
		Icon: Database,
		skills: [
			"Python",
			"Dagster",
			"AWS Athena",
			"PostgreSQL",
			"S3",
			"Node.js",
			"REST",
			"WebSockets",
		],
	},
	{
		label: "Frontend & Mobile",
		accent: "blue",
		Icon: Monitor,
		skills: [
			"Next.js",
			"React",
			"React Native",
			"TypeScript",
			"Tailwind CSS",
			"Framer Motion",
			"Bun",
			"Deno",
		],
	},
];

export default function DashboardPage() {
	return (
		<PageShell breadcrumb="Dashboard" accent="emerald">
			{/* header */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
				className="mb-14"
			>
				<div className="flex items-center gap-2 mb-3">
					<span className="h-px w-6 bg-emerald-400/60" />
					<p className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase">
						Live Status
					</p>
				</div>
				<h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
					System Health Dashboard
				</h1>
				<p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
					A full breakdown of the infrastructure, data pipelines, and
					frontend systems I own and operate. Numbers are real —
					pulled from production context.
				</p>
			</motion.div>

			{/* system metrics */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
			>
				{SYSTEM_METRICS.map((m) => (
					<div
						key={m.label}
						className={cn(
							"rounded-xl border px-5 py-4 backdrop-blur-md",
							accentBorder[m.accent],
						)}
					>
						<p
							className={cn(
								"text-2xl font-semibold tracking-tight font-display",
								accentText[m.accent],
							)}
						>
							{m.value}
						</p>
						<p className="mt-1 text-xs text-zinc-500 leading-snug">
							{m.label}
						</p>
					</div>
				))}
			</motion.div>

			{/* status cards (full width) */}
			<div className="mb-16">
				<h2 className="font-display text-lg font-semibold text-zinc-200 mb-5">
					Service Status
				</h2>
				<div className="grid gap-4 md:grid-cols-3">
					{DASHBOARD_CARDS.map((card, index) => (
						<StatusCard key={card.title} {...card} index={index} />
					))}
				</div>
			</div>

			{/* skill categories */}
			<div>
				<h2 className="font-display text-lg font-semibold text-zinc-200 mb-5">
					Full Stack
				</h2>
				<div className="grid gap-4 md:grid-cols-3">
					{SKILL_CATEGORIES.map((cat, ci) => (
						<motion.div
							key={cat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.45, delay: ci * 0.1 }}
							className={cn(
								"grad-border-" + cat.accent,
								"rounded-xl p-5 backdrop-blur-md",
								cat.accent === "emerald" && "bg-emerald-950/15",
								cat.accent === "violet" && "bg-violet-950/15",
								cat.accent === "blue" && "bg-blue-950/15",
							)}
						>
							<div
								className={cn(
									"mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg",
									cat.accent === "emerald" &&
										"bg-emerald-500/10 text-emerald-400",
									cat.accent === "violet" &&
										"bg-violet-500/10 text-violet-400",
									cat.accent === "blue" &&
										"bg-blue-500/10 text-blue-400",
								)}
							>
								<cat.Icon className="h-4.5 w-4.5" />
							</div>
							<h3 className="font-display text-sm font-semibold text-zinc-100 mb-3">
								{cat.label}
							</h3>
							<ul className="space-y-2">
								{cat.skills.map((skill) => (
									<li
										key={skill}
										className="flex items-center gap-2 text-sm text-zinc-300"
									>
										<CheckCircle2
											className={cn(
												"h-3.5 w-3.5 shrink-0",
												cat.accent === "emerald" &&
													"text-emerald-500/70",
												cat.accent === "violet" &&
													"text-violet-500/70",
												cat.accent === "blue" &&
													"text-blue-500/70",
											)}
										/>
										{skill}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>

			{/* core skills raw */}
			<div className="mt-12">
				<h2 className="font-display text-lg font-semibold text-zinc-200 mb-5">
					Core Modules
				</h2>
				<div className="flex flex-wrap gap-2">
					{CORE_SKILLS.map((skill) => (
						<span
							key={skill}
							className="rounded border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-sm text-zinc-300 backdrop-blur-md"
						>
							{skill}
						</span>
					))}
				</div>
			</div>
		</PageShell>
	);
}
