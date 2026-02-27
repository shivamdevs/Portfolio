"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import { HERO, PERSONAL, SYSTEM_METRICS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

export function HeroSection() {
	return (
		<section id="hero" className="relative min-h-screen overflow-hidden">
			{/* 3D canvas */}
			{/* <div className="absolute inset-0">
				<DataScene />
			</div> */}

			{/* content layer */}
			<div className="relative z-30 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-end px-6 pb-20 pt-28 md:px-10">
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="max-w-2xl"
				>
					{/* eyebrow */}
					<div className="mb-5 flex items-center gap-3">
						<span className="h-px w-8 bg-emerald-400/60" />
						<p className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase">
							@ShivamDevs · Systems Owner
						</p>
					</div>

					{/* name + headline */}
					<h1 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-[3rem] md:leading-[1.15]">
						{HERO.heading}
					</h1>

					<p className="mt-5 text-base leading-relaxed text-zinc-400 max-w-xl">
						{HERO.subheading}
					</p>

					{/* tag strip */}
					<div className="mt-6 flex flex-wrap gap-2">
						<span className="rounded border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 font-medium">
							Software Engineer
						</span>
						<span className="rounded border border-white/12 bg-white/5 px-3 py-1 text-xs text-zinc-300">
							{PERSONAL.role}
						</span>
						<span className="rounded border border-white/12 bg-white/5 px-3 py-1 text-xs text-zinc-400 font-mono">
							{PERSONAL.location}
						</span>
					</div>

					{/* CTA */}
					<motion.button
						data-active="true"
						type="button"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() =>
							document
								.getElementById("projects")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="mt-8 group flex items-center gap-2 rounded border border-white/15 bg-white/6 px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-emerald-400/50 hover:text-emerald-200 hover:bg-white/8"
					>
						{HERO.ctaLabel}
						<ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
					</motion.button>
				</motion.div>

				{/* floating metrics row */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.35 }}
					className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
				>
					{SYSTEM_METRICS.map((m) => (
						<div
							key={m.label}
							className={cn(
								"rounded-lg border px-4 py-3 backdrop-blur-md bg-black/30",
								accentBorder[m.accent],
							)}
						>
							<p
								className={cn(
									"text-xl font-semibold tracking-tight",
									accentText[m.accent],
								)}
							>
								{m.value}
							</p>
							<p className="mt-0.5 text-[11px] text-zinc-500 leading-tight">
								{m.label}
							</p>
						</div>
					))}
				</motion.div>
				<p className="mt-3 text-sm leading-relaxed text-transparent max-w-xl">
					Hi, I&apos;m Shivam Dewangan, also known as shivamdevs
					across the web.
				</p>
			</div>
		</section>
	);
}
