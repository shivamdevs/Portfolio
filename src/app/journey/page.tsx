"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Zap } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { TIMELINE } from "@/lib/constants";

/* ── color per role ───────────────────────────────── */
const roleAccent: Record<
	string,
	{
		line: string;
		node: string;
		nodeShadow: string;
		border: string;
		bg: string;
		tag: string;
		tagBg: string;
	}
> = {
	"Engineering Lead": {
		line: "emerald",
		node: "bg-emerald-300 border-emerald-300",
		nodeShadow: "shadow-[0_0_10px_2px_rgb(0_208_132/0.55)]",
		border: "grad-border-emerald",
		bg: "bg-emerald-950/15",
		tag: "text-emerald-300",
		tagBg: "border-emerald-400/25 bg-emerald-500/8",
	},
	"Founding Full Stack Engineer": {
		line: "violet",
		node: "bg-violet-300 border-violet-300",
		nodeShadow: "shadow-[0_0_10px_2px_rgb(155_125_255/0.55)]",
		border: "grad-border-violet",
		bg: "bg-violet-950/15",
		tag: "text-violet-300",
		tagBg: "border-violet-400/25 bg-violet-500/8",
	},
	Acquisition: {
		line: "amber",
		node: "bg-amber-300 border-amber-300",
		nodeShadow: "shadow-[0_0_10px_2px_rgb(245_158_11/0.55)]",
		border: "grad-border-amber",
		bg: "bg-amber-950/12",
		tag: "text-amber-300",
		tagBg: "border-amber-400/25 bg-amber-500/8",
	},
	"Software Engineer Intern": {
		line: "blue",
		node: "bg-blue-300 border-blue-300",
		nodeShadow: "shadow-[0_0_10px_2px_rgb(46_168_255/0.55)]",
		border: "grad-border-blue",
		bg: "bg-blue-950/15",
		tag: "text-blue-300",
		tagBg: "border-blue-400/25 bg-blue-500/8",
	},
};

export default function JourneyPage() {
	return (
		<PageShell breadcrumb="Journey" accent="blue">
			{/* header */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
				className="mb-16"
			>
				<div className="flex items-center gap-2 mb-3">
					<span className="h-px w-6 bg-blue-400/60" />
					<p className="font-mono text-[10px] tracking-[0.3em] text-blue-400 uppercase">
						The Evolution
					</p>
				</div>
				<h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
					Acquisition Journey
				</h1>
				<p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
					From intern at Terribly Tiny Tales to Engineering Lead —
					through an acquisition — in under 12&nbsp;months. Every step
					is documented below.
				</p>
			</motion.div>

			{/* vertical timeline */}
			<div className="relative">
				{/* rail */}
				<div className="absolute left-3 top-0 bottom-0 w-px bg-linear-to-b from-emerald-500/50 via-violet-500/30 via-amber-500/20 to-blue-500/20" />

				<div className="space-y-10 pl-12">
					{TIMELINE.map((item, index) => {
						const a =
							roleAccent[item.role] ??
							roleAccent["Software Engineer Intern"]!;
						return (
							<motion.div
								key={item.role}
								initial={{ opacity: 0, x: -16 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.25 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="relative"
							>
								{/* node dot */}
								<span
									className={`absolute -left-12 top-5 block h-4 w-4 rounded-full border-2 ${a.node} ${a.nodeShadow}`}
								/>

								{/* card */}
								<div
									className={`rounded-xl p-6 backdrop-blur-md transition-all duration-300 ${a.border} ${a.bg}`}
								>
									{/* meta row */}
									<div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
										<span
											className={`font-mono text-[10px] tracking-[0.25em] uppercase ${a.tag}`}
										>
											{item.period}
										</span>
										<span className="flex items-center gap-1 text-xs text-zinc-500">
											<MapPin className="h-3 w-3" />
											{item.company}
										</span>
										<span className="flex items-center gap-1 text-xs text-zinc-600">
											<Calendar className="h-3 w-3" />
											{item.period}
										</span>
									</div>

									<h2 className="font-display text-xl font-semibold text-zinc-100">
										{item.role}
									</h2>

									<p className="mt-3 text-sm leading-relaxed text-zinc-300">
										{item.achievement}
									</p>

									{/* tags */}
									<div className="mt-5 flex flex-wrap gap-2">
										{item.tags.map((tag) => (
											<span
												key={tag}
												className={`flex items-center gap-1 rounded border px-2 py-0.5 text-xs ${a.tagBg} ${a.tag}`}
											>
												<Zap className="h-2.5 w-2.5" />
												{tag}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</PageShell>
	);
}
