"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Layers, ChevronRight, Zap } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { COMPANIES } from "@/lib/constants";

/* ── accent config ─────────────────────────────────── */
const accentMap = {
	emerald: {
		line: "from-emerald-500/50 via-emerald-500/20 to-transparent",
		node: "bg-emerald-300 border-emerald-300 shadow-[0_0_10px_2px_rgb(0_208_132/0.5)]",
		border: "grad-border-emerald",
		bg: "bg-emerald-950/12",
		tag: "text-emerald-300",
		tagBg: "border-emerald-400/25 bg-emerald-500/8",
		label: "text-emerald-400",
		badge: "text-emerald-300 border-emerald-400/30 bg-emerald-500/8",
		projectBorder: "border-emerald-500/15",
		projectBg: "bg-emerald-950/8",
		stackTag: "text-emerald-300 border-emerald-400/20 bg-emerald-500/8",
		divider: "bg-emerald-500/15",
	},
	blue: {
		line: "from-blue-500/50 via-blue-500/20 to-transparent",
		node: "bg-blue-300 border-blue-300 shadow-[0_0_10px_2px_rgb(46_168_255/0.5)]",
		border: "grad-border-blue",
		bg: "bg-blue-950/12",
		tag: "text-blue-300",
		tagBg: "border-blue-400/25 bg-blue-500/8",
		label: "text-blue-400",
		badge: "text-blue-300 border-blue-400/30 bg-blue-500/8",
		projectBorder: "border-blue-500/15",
		projectBg: "bg-blue-950/8",
		stackTag: "text-blue-300 border-blue-400/20 bg-blue-500/8",
		divider: "bg-blue-500/15",
	},
} as const;

type AccentKey = keyof typeof accentMap;

export default function JourneyPage() {
	return (
		<PageShell breadcrumb="Journey" accent="blue">
			{/* page header */}
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
					through an acquisition — in under 12&nbsp;months. Every
					company, every role, every project — documented below.
				</p>
			</motion.div>

			{/* company sections */}
			<div className="space-y-20">
				{COMPANIES.map((company, ci) => {
					const a = accentMap[company.accent as AccentKey];
					return (
						<motion.section
							key={company.id}
							id={company.id}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }}
							transition={{ duration: 0.5, delay: ci * 0.08 }}
						>
							{/* company header card */}
							<div
								className={`rounded-xl p-6 backdrop-blur-md ${a.border} ${a.bg} mb-10`}
							>
								<div className="flex flex-wrap items-start justify-between gap-4">
									<div>
										<span
											className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.3em] uppercase mb-2 ${a.badge}`}
										>
											{company.shortName}
										</span>
										<h2 className="font-display text-2xl font-semibold text-zinc-100 md:text-3xl">
											{company.name}
										</h2>
										<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
											<span className="flex items-center gap-1 text-xs text-zinc-500">
												<Calendar className="h-3 w-3" />
												{company.period}
											</span>
											<span className="flex items-center gap-1 text-xs text-zinc-500">
												<MapPin className="h-3 w-3" />
												{company.location}
											</span>
										</div>
									</div>
									{/* highlights */}
									<div className="flex flex-wrap gap-2">
										{company.highlights.map((h) => (
											<span
												key={h}
												className={`flex items-center gap-1 rounded border px-2.5 py-1 text-xs font-medium ${a.tagBg} ${a.tag}`}
											>
												<Zap className="h-2.5 w-2.5" />
												{h}
											</span>
										))}
									</div>
								</div>
								<p className="mt-4 text-sm leading-relaxed text-zinc-300 max-w-3xl">
									{company.summary}
								</p>
							</div>

							<div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
								{/* === roles timeline === */}
								<div>
									<div className="flex items-center gap-2 mb-6">
										<ChevronRight
											className={`h-4 w-4 ${a.label}`}
										/>
										<h3
											className={`text-[11px] font-medium tracking-[0.25em] uppercase ${a.label}`}
										>
											Roles
										</h3>
									</div>

									<div className="relative pl-8">
										{/* rail */}
										<div
											className={`absolute left-2 top-2 bottom-0 w-px bg-linear-to-b ${a.line}`}
										/>

										<div className="space-y-8">
											{company.roles.map((role, ri) => (
												<motion.div
													key={role.title}
													initial={{
														opacity: 0,
														x: -12,
													}}
													whileInView={{
														opacity: 1,
														x: 0,
													}}
													viewport={{
														once: true,
														amount: 0.4,
													}}
													transition={{
														duration: 0.4,
														delay: ri * 0.1,
													}}
													className="relative"
												>
													{/* node */}
													<span
														className={`absolute -left-8 top-1.5 block h-3.5 w-3.5 rounded-full border-2 ${a.node}`}
													/>

													<p
														className={`font-mono text-[10px] tracking-[0.25em] uppercase mb-1 ${a.label}`}
													>
														{role.period}
													</p>
													<h4 className="text-base font-semibold text-zinc-100">
														{role.title}
													</h4>
													<p className="mt-2 text-sm leading-relaxed text-zinc-400">
														{role.description}
													</p>
													<div className="mt-3 flex flex-wrap gap-1.5">
														{role.tags.map(
															(tag) => (
																<span
																	key={tag}
																	className={`rounded border px-2 py-0.5 text-[11px] ${a.tagBg} ${a.tag}`}
																>
																	{tag}
																</span>
															),
														)}
													</div>
												</motion.div>
											))}
										</div>
									</div>
								</div>

								{/* === projects === */}
								<div>
									<div className="flex items-center gap-2 mb-6">
										<Layers
											className={`h-4 w-4 ${a.label}`}
										/>
										<h3
											className={`text-[11px] font-medium tracking-[0.25em] uppercase ${a.label}`}
										>
											Projects
										</h3>
									</div>

									<div className="space-y-4">
										{company.projects.map((project, pi) => (
											<motion.div
												key={project.name}
												initial={{ opacity: 0, y: 12 }}
												whileInView={{
													opacity: 1,
													y: 0,
												}}
												viewport={{
													once: true,
													amount: 0.3,
												}}
												transition={{
													duration: 0.4,
													delay: pi * 0.1,
												}}
												className={`rounded-lg border p-5 backdrop-blur-sm transition-all duration-200 ${a.projectBorder} ${a.projectBg}`}
											>
												<div className="flex items-start justify-between gap-2 mb-2">
													<div>
														<h4 className="text-sm font-semibold text-zinc-100">
															{project.name}
														</h4>
														<p
															className={`font-mono text-[10px] tracking-[0.2em] mt-0.5 ${a.label}`}
														>
															{project.period}
														</p>
													</div>
													<span className="shrink-0 rounded bg-zinc-800/60 px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
														{project.type}
													</span>
												</div>

												<p className="text-xs leading-relaxed text-zinc-400 mb-3">
													{project.description}
												</p>

												{/* stack */}
												<div className="flex flex-wrap gap-1.5 mb-3">
													{project.stack.map((s) => (
														<span
															key={s}
															className={`rounded border px-2 py-0.5 font-mono text-[10px] ${a.stackTag}`}
														>
															{s}
														</span>
													))}
												</div>

												<div
													className={`h-px w-full mb-3 ${a.divider}`}
												/>
												<p
													className={`text-[11px] font-medium ${a.label}`}
												>
													{project.impact}
												</p>
											</motion.div>
										))}
									</div>
								</div>
							</div>
						</motion.section>
					);
				})}
			</div>
		</PageShell>
	);
}
