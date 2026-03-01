"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";

import { COMPANIES } from "@/lib/constants";

const accentMap = {
	emerald: {
		border: "grad-border-emerald",
		bg: "bg-emerald-950/10",
		tag: "text-emerald-300",
		tagBg: "border-emerald-400/20 bg-emerald-500/8",
		dot: "bg-emerald-400",
		label: "text-emerald-400",
		badge: "text-emerald-300 border-emerald-400/25 bg-emerald-500/8",
		cta: "text-emerald-400 border-emerald-400/30 hover:bg-emerald-500/10",
		shadow: "hover:shadow-[0_4px_32px_-4px_rgb(0,208,132,0.4)]",
	},
	blue: {
		border: "grad-border-blue",
		bg: "bg-blue-950/10",
		tag: "text-blue-300",
		tagBg: "border-blue-400/20 bg-blue-500/8",
		dot: "bg-blue-400",
		label: "text-blue-400",
		badge: "text-blue-300 border-blue-400/25 bg-blue-500/8",
		cta: "text-blue-400 border-blue-400/30 hover:bg-blue-500/10",
		shadow: "hover:shadow-[0_4px_32px_-4px_rgb(46,168,255,0.4)]",
	},
} as const;

export function TimelineSection() {
	return (
		<section
			id="timeline"
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
					<span className="h-px w-6 bg-blue-400/60" />
					<p className="text-[11px] tracking-[0.25em] text-blue-300 uppercase font-medium">
						The Evolution
					</p>
				</div>
				<h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
					Acquisition Journey
				</h2>
				<p className="mt-2 max-w-xl text-sm text-zinc-400">
					From intern at Terribly Tiny Tales to Engineering Lead after
					acquisition by Collective Artists Network — in under
					12&nbsp;months.
				</p>
			</motion.div>

			{/* Two company cards */}
			<div className="mt-10 grid gap-5">
				{COMPANIES.map((company, index) => {
					const a = accentMap[company.accent];
					return (
						<motion.div
							key={company.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.25 }}
							transition={{ duration: 0.45, delay: index * 0.12 }}
							className={`group relative rounded-xl p-6 backdrop-blur-md transition-all duration-300 ${a.border} ${a.bg} ${a.shadow}`}
						>
							{/* header */}
							<div className="flex items-start justify-between gap-3 mb-4">
								<div>
									<p
										className={`font-mono text-[10px] tracking-[0.28em] uppercase ${a.label}`}
									>
										{company.period}
									</p>
									<h3 className="mt-1 text-lg font-semibold text-zinc-100 leading-tight">
										{company.name}
									</h3>
									<span className="flex items-center gap-1 mt-0.5 text-xs text-zinc-500">
										<MapPin className="h-3 w-3" />
										{company.location}
									</span>
								</div>
								<span
									className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest ${a.badge}`}
								>
									{company.shortName}
								</span>
							</div>

							{/* summary */}
							<p className="text-sm leading-relaxed text-zinc-400 mb-5">
								{company.summary}
							</p>

							{/* roles list */}
							<div className="space-y-1.5 mb-5">
								{company.roles.map((role) => (
									<div
										key={role.title}
										className="flex items-center gap-2"
									>
										<span
											className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`}
										/>
										<span className="text-xs text-zinc-300 font-medium">
											{role.title}
										</span>
										<span className="text-xs text-zinc-600 ml-auto shrink-0">
											{role.period}
										</span>
									</div>
								))}
							</div>

							{/* highlights */}
							<div className="flex flex-wrap gap-2 mb-4">
								{company.highlights.map((h) => (
									<span
										key={h}
										className={`rounded border px-2 py-0.5 text-[11px] ${a.tagBg} ${a.tag}`}
									>
										{h}
									</span>
								))}
							</div>

							{/* detail CTA */}
							<Link
								href={`/journey#${company.id}`}
								className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${a.cta}`}
							>
								View details
								<ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
							</Link>
						</motion.div>
					);
				})}
			</div>

			{/* full journey CTA */}
			<div className="mt-8 flex justify-end">
				<Link
					href="/journey"
					className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-blue-300 group"
				>
					Full acquisition story
					<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</Link>
			</div>
		</section>
	);
}
