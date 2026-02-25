"use client";

import { motion } from "framer-motion";
import { Server, Database, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Accent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatusCardProps = {
	title: string;
	stack: readonly string[];
	metricLabel: string;
	metricValue: string;
	detail: string;
	accent: Accent;
	icon: string;
	index?: number;
};

const accentChip: Record<Accent, string> = {
	emerald: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
	violet: "border-violet-400/30 bg-violet-500/10 text-violet-300",
	blue: "border-blue-400/30 bg-blue-500/10 text-blue-300",
	amber: "border-amber-400/30 bg-amber-500/10 text-amber-300",
	none: "border-white/10 bg-white/5 text-zinc-300",
};

const accentMetric: Record<Accent, string> = {
	emerald: "text-emerald-300",
	violet: "text-violet-300",
	blue: "text-blue-300",
	amber: "text-amber-300",
	none: "text-zinc-200",
};

const accentIcon: Record<Accent, string> = {
	emerald: "text-emerald-400",
	violet: "text-violet-400",
	blue: "text-blue-400",
	amber: "text-amber-400",
	none: "text-zinc-400",
};

const titleIconMap: Record<string, LucideIcon> = {
	Infrastructure: Server,
	"Data Engine": Database,
	Frontend: Monitor,
};

const sparkPoints =
	"0,22 22,18 44,20 66,12 88,16 110,9 132,14 154,7 176,11 200,5";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StatusCard({
	title,
	stack,
	metricLabel,
	metricValue,
	detail,
	accent,
	icon: _icon,
	index = 0,
}: StatusCardProps) {
	const isDataEngine = metricLabel === "Scale";
	const IconComponent = titleIconMap[title] ?? Server;

	return (
		<motion.div
			initial={{ opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="h-full"
		>
			<Card accent={accent} className="h-full">
				<CardHeader>
					{/* top bar */}
					<div className="flex items-start justify-between gap-3">
						<div className="flex items-center gap-2">
							<div
								className={cn(
									"flex h-7 w-7 items-center justify-center rounded-md bg-white/5",
									accentIcon[accent],
								)}
							>
								<IconComponent className="h-4 w-4" />
							</div>
							<CardTitle>{title}</CardTitle>
						</div>
						<span
							className={cn(
								"shrink-0 rounded border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
								accentChip[accent],
							)}
						>
							{metricLabel}
						</span>
					</div>
					{/* detail */}
					<p className="mt-1 text-sm leading-relaxed text-zinc-400 pt-1">
						{detail}
					</p>
				</CardHeader>

				<CardContent className="space-y-4 pt-2">
					{/* big metric */}
					<p
						className={cn(
							"text-3xl font-semibold tracking-tight",
							accentMetric[accent],
						)}
					>
						{metricValue}
					</p>

					{/* sparkline for data engine */}
					{isDataEngine && (
						<div className="h-9 rounded border border-white/8 bg-black/30 px-2 py-1">
							<svg
								viewBox="0 0 200 28"
								className="h-full w-full"
								aria-hidden="true"
								preserveAspectRatio="none"
							>
								<defs>
									<linearGradient
										id="spark-grad"
										x1="0"
										y1="0"
										x2="1"
										y2="0"
									>
										<stop
											offset="0%"
											stopColor="rgb(155 125 255 / 0.3)"
										/>
										<stop
											offset="100%"
											stopColor="rgb(155 125 255)"
										/>
									</linearGradient>
								</defs>
								<polyline
									points={sparkPoints}
									fill="none"
									stroke="url(#spark-grad)"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					)}

					{/* stack chips */}
					<div className="flex flex-wrap gap-1.5">
						{stack.map((item) => (
							<span
								key={item}
								className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-300"
							>
								{item}
							</span>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
