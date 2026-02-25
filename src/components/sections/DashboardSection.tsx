"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { DASHBOARD_CARDS } from "@/lib/constants";
import { StatusCard } from "@/components/dashboard/StatusCard";

export function DashboardSection() {
	return (
		<section
			id="dashboard"
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
					<span className="h-px w-6 bg-emerald-400/60" />
					<p className="text-[11px] tracking-[0.25em] text-emerald-300 uppercase font-medium">
						Live Status
					</p>
				</div>
				<h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
					System Health Dashboard
				</h2>
				<p className="mt-2 max-w-xl text-sm text-zinc-400">
					Infrastructure, data, and frontend — the three pillars of
					every system I&apos;ve shipped.
				</p>
			</motion.div>

			<div className="mt-10 grid gap-4 md:grid-cols-3">
				{DASHBOARD_CARDS.map((card, index) => (
					<StatusCard key={card.title} {...card} index={index} />
				))}
			</div>

			{/* view full CTA */}
			<div className="mt-8 flex justify-end">
				<Link
					href="/dashboard"
					className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-emerald-300 group"
				>
					Full system overview
					<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</Link>
			</div>
		</section>
	);
}
