"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
	Dna,
	Wrench,
	Rocket,
	Github,
	FileText,
	Mail,
	ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { EXTERNAL_LINKS, HIRING_MINDSET, PERSONAL } from "@/lib/constants";

type MindsetItem = (typeof HIRING_MINDSET)[number];

const itemConfig: Record<
	MindsetItem["title"],
	{
		Icon: LucideIcon;
		borderClass: string;
		bgClass: string;
		iconClass: string;
	}
> = {
	"Compounding DNA": {
		Icon: Dna,
		borderClass: "grad-border-emerald",
		bgClass: "bg-linear-to-br from-emerald-950/20 to-black/10",
		iconClass: "text-emerald-400 bg-emerald-500/10",
	},
	"Pragmatic Architecture": {
		Icon: Wrench,
		borderClass: "grad-border-violet",
		bgClass: "bg-linear-to-br from-violet-950/20 to-black/10",
		iconClass: "text-violet-400 bg-violet-500/10",
	},
	"Zero-to-One Mindset": {
		Icon: Rocket,
		borderClass: "grad-border-blue",
		bgClass: "bg-linear-to-br from-blue-950/20 to-black/10",
		iconClass: "text-blue-400 bg-blue-500/10",
	},
} as const;

export function HiringMindsetSection() {
	return (
		<section
			id="contact"
			className="mx-auto w-full max-w-6xl px-6 py-24 pb-32 md:px-10"
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
						Hiring Mindset
					</p>
				</div>
				<h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
					What I look for in a team.
				</h2>
				<p className="mt-2 max-w-xl text-sm text-zinc-400">
					For recruiters and founders — the philosophy behind how I
					hire and who I want to work with.
				</p>
			</motion.div>
			<div className="mt-10 grid gap-4 md:grid-cols-3">
				{HIRING_MINDSET.map((item, index) => {
					const cfg =
						itemConfig[item.title as keyof typeof itemConfig];
					if (!cfg) return null;
					const { Icon, borderClass, bgClass, iconClass } = cfg;
					return (
						<motion.article
							key={item.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.45, delay: index * 0.1 }}
							className={`rounded-xl p-5 backdrop-blur-md transition-all duration-300 ${borderClass} ${bgClass}`}
						>
							<div
								className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
							>
								<Icon className="h-4.5 w-4.5" />
							</div>
							<h3 className="mt-3 text-base font-semibold text-zinc-100">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-zinc-400">
								{item.body}
							</p>
						</motion.article>
					);
				})}
			</div>
			{/* get in touch */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.45, delay: 0.2 }}
				className="mt-14 rounded-xl grad-border-emerald bg-linear-to-br from-emerald-950/20 to-black/10 p-8 backdrop-blur-md text-center"
			>
				<p className="text-[11px] tracking-[0.25em] text-emerald-400 uppercase font-medium mb-3">
					Get in Touch
				</p>
				<h3 className="text-xl font-semibold text-zinc-100">
					Building something ambitious?
				</h3>
				<p className="mt-2 text-sm text-zinc-400 max-w-sm mx-auto">
					I&apos;m {PERSONAL.name} — {PERSONAL.role}. Open to
					conversations about staff/lead roles at high-growth
					startups.
				</p>

				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<a
						href={EXTERNAL_LINKS.contact}
						className="flex items-center gap-2 rounded border border-emerald-400/40 bg-emerald-500/15 px-5 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/25 hover:border-emerald-400/70"
					>
						<Mail className="h-4 w-4" />
						Say Hello
					</a>
					<a
						href={EXTERNAL_LINKS.github}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2 rounded border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/8"
					>
						<Github className="h-4 w-4" />
						GitHub
					</a>
					<a
						href={EXTERNAL_LINKS.resume}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2 rounded border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/8"
					>
						<FileText className="h-4 w-4" />
						Resume
					</a>
				</div>
			</motion.div>
			{/* view full CTA */}
			<div className="mt-8 flex justify-end">
				<Link
					href="/contact"
					className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-blue-300 group"
				>
					Get in touch
					<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</Link>
			</div>{" "}
		</section>
	);
}
