"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { TIMELINE } from "@/lib/constants";

export function TimelineSection() {
	const [activeIndex, setActiveIndex] = useState(0);

	const active = TIMELINE[activeIndex];

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
					12 months.
				</p>
			</motion.div>

			<div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
				{/* timeline rail */}
				<div className="relative pl-6">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-emerald-500/40 via-blue-500/20 to-transparent" />

					{TIMELINE.map((item, index) => {
						const isActive = index === activeIndex;
						const isPast = index < activeIndex;

						return (
							<button
								key={item.role}
								type="button"
								data-active="true"
								onMouseEnter={() => setActiveIndex(index)}
								onFocus={() => setActiveIndex(index)}
								onClick={() => setActiveIndex(index)}
								className="group relative mb-8 block w-full text-left last:mb-0"
							>
								{/* node */}
								<span
									className={`absolute -left-6 top-1.5 block h-3 w-3 rounded-full border-2 transition-all duration-200 ${
										isActive
											? "border-emerald-300 bg-emerald-300 shadow-[0_0_8px_2px_rgb(0_208_132/0.5)]"
											: isPast
												? "border-zinc-600 bg-zinc-600"
												: "border-zinc-700 bg-transparent"
									}`}
								/>

								<p
									className={`text-xs transition-colors ${isActive ? "text-emerald-400" : "text-zinc-600"}`}
								>
									{item.period}
								</p>
								<p
									className={`text-sm font-medium mt-0.5 transition-colors ${
										isActive
											? "text-zinc-100"
											: "text-zinc-500 group-hover:text-zinc-300"
									}`}
								>
									{item.role}
								</p>
								<p className="text-xs text-zinc-600 mt-0.5">
									{item.company}
								</p>
							</button>
						);
					})}
				</div>

				{/* detail card */}
				<AnimatePresence mode="wait">
					{active && (
						<motion.div
							key={active.role}
							initial={{ opacity: 0, x: 12 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -8 }}
							transition={{ duration: 0.22 }}
							className="grad-border-emerald rounded-xl bg-emerald-950/10 p-6 backdrop-blur-md transition-all duration-300 hover:shadow-[0_4px_32px_-4px_rgb(0_208_132/0.2)]"
						>
							<p className="text-[11px] tracking-[0.25em] text-emerald-400 uppercase font-medium">
								Core Achievement
							</p>
							<h3 className="mt-3 text-xl font-semibold text-zinc-100">
								{active.role}
							</h3>
							<p className="text-sm text-zinc-400 mt-0.5">
								{active.company} &middot; {active.period}
							</p>
							<p className="mt-4 text-sm leading-relaxed text-zinc-300">
								{active.achievement}
							</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{active.tags.map((tag) => (
									<span
										key={tag}
										className="rounded border border-emerald-400/20 bg-emerald-500/8 px-2 py-0.5 text-xs text-emerald-300"
									>
										{tag}
									</span>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* view full CTA */}
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
