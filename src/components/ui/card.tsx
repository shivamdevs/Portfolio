import * as React from "react";

import { cn } from "@/lib/utils";

type Accent = "emerald" | "violet" | "blue" | "amber" | "none";

const accentGlow: Record<Accent, string> = {
	emerald:
		"grad-border-emerald hover:shadow-[0_4px_32px_-4px_rgb(0_208_132/0.22)]",
	violet: "grad-border-violet hover:shadow-[0_4px_32px_-4px_rgb(155_125_255/0.22)]",
	blue: "grad-border-blue hover:shadow-[0_4px_32px_-4px_rgb(46_168_255/0.22)]",
	amber: "grad-border-amber hover:shadow-[0_4px_32px_-4px_rgb(245_158_11/0.22)]",
	none: "",
};

const accentBg: Record<Accent, string> = {
	emerald: "bg-linear-to-br from-emerald-950/25 via-black/15 to-black/20",
	violet: "bg-linear-to-br from-violet-950/25 via-black/15 to-black/20",
	blue: "bg-linear-to-br from-blue-950/25 via-black/15 to-black/20",
	amber: "bg-linear-to-br from-amber-950/25 via-black/15 to-black/20",
	none: "bg-white/[0.03]",
};

type CardProps = React.ComponentProps<"div"> & { accent?: Accent };

function Card({ className, accent = "none", ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			className={cn(
				"rounded-xl backdrop-blur-md transition-all duration-300",
				accentBg[accent],
				accentGlow[accent],
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn("flex flex-col gap-1.5 px-5 pt-5", className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			data-slot="card-title"
			className={cn(
				"text-base font-semibold tracking-tight text-zinc-100",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="card-description"
			className={cn("text-sm leading-relaxed text-zinc-400", className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-5 pb-5", className)}
			{...props}
		/>
	);
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
export type { Accent };
