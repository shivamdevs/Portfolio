"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	Dna,
	Wrench,
	Rocket,
	Github,
	Linkedin,
	Mail,
	FileText,
	MapPin,
	Loader2,
	CircleCheck,
	CircleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { useAuthSession } from "@/hooks/useAuthSession";
import { PageShell } from "@/components/layout/PageShell";
import {
	buildAccountsAuthUrl,
	EXTERNAL_LINKS,
	HIRING_MINDSET,
	PERSONAL,
} from "@/lib/constants";

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
		bgClass: "bg-emerald-950/15",
		iconClass: "text-emerald-400 bg-emerald-500/10",
	},
	"Pragmatic Architecture": {
		Icon: Wrench,
		borderClass: "grad-border-violet",
		bgClass: "bg-violet-950/15",
		iconClass: "text-violet-400 bg-violet-500/10",
	},
	"Zero-to-One Mindset": {
		Icon: Rocket,
		borderClass: "grad-border-blue",
		bgClass: "bg-blue-950/15",
		iconClass: "text-blue-400 bg-blue-500/10",
	},
} as const;

const CONTACT_LINKS: {
	label: string;
	sub: string;
	href: string;
	Icon: LucideIcon;
	accent: string;
	download?: string;
}[] = [
	{
		label: "Email",
		sub: "hi@shivamdevs.com",
		href: EXTERNAL_LINKS.contact,
		Icon: Mail,
		accent: "emerald",
	},
	{
		label: "GitHub",
		sub: "@ShivamDevs",
		href: EXTERNAL_LINKS.github,
		Icon: Github,
		accent: "zinc",
	},
	{
		label: "LinkedIn",
		sub: "/in/shivamdevs",
		href: EXTERNAL_LINKS.linkedin,
		Icon: Linkedin,
		accent: "blue",
	},
	{
		label: "Resume",
		sub: "Download PDF",
		href: EXTERNAL_LINKS.resume,
		Icon: FileText,
		accent: "blue",
		download: "ShivamDevs_Resume.pdf",
	},
	{
		label: "Location",
		sub: PERSONAL.location,
		href: EXTERNAL_LINKS.location,
		Icon: MapPin,
		accent: "amber",
	},
];

export default function ContactPage() {
	const { user, isLoading } = useAuthSession();
	const [authHref, setAuthHref] = useState(
		buildAccountsAuthUrl(`${EXTERNAL_LINKS.website}/contact`),
	);
	const [subject, setSubject] = useState("Exploring a role at your team");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitState, setSubmitState] = useState<
		"idle" | "success" | "error"
	>("idle");
	const [submitMessage, setSubmitMessage] = useState("");

	useEffect(() => {
		setAuthHref(buildAccountsAuthUrl(window.location.href));
	}, []);

	const onSendMessage = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!user || !message.trim()) return;
		if (subject.trim().length < 3) {
			setSubmitState("error");
			setSubmitMessage("Please add a meaningful subject.");
			return;
		}

		setIsSubmitting(true);
		setSubmitState("idle");
		setSubmitMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					subject,
					message,
				}),
			});

			if (!response.ok) {
				const payload = (await response.json().catch(() => null)) as {
					error?: string;
				} | null;
				setSubmitState("error");
				setSubmitMessage(
					payload?.error ||
						"Could not submit your message right now. Please try again.",
				);
				return;
			}

			setSubmitState("success");
			setSubmitMessage(
				"Message submitted successfully. I’ll get back to you soon.",
			);
			setMessage("");
		} catch {
			setSubmitState("error");
			setSubmitMessage(
				"Network issue while submitting. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<PageShell breadcrumb="Contact" accent="blue">
			{/* header */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
				className="mb-14"
			>
				<div className="flex items-center gap-2 mb-3">
					<span className="h-px w-6 bg-blue-400/60" />
					<p className="font-mono text-[10px] tracking-[0.3em] text-blue-400 uppercase">
						Get In Touch
					</p>
				</div>
				<h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
					Let&apos;s build something together.
				</h1>
				<p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
					I&apos;m open to conversations about senior / lead
					engineering roles at high-growth startups. If you&apos;re
					building something ambitious — reach out.
				</p>
			</motion.div>

			{/* contact links */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="mb-16 grid gap-3 sm:grid-cols-1 lg:grid-cols-5"
			>
				{CONTACT_LINKS.map((link) => (
					<Link
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noreferrer"
						download={link.download}
						className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 p-4 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/6 ${link.href === "#" ? "pointer-events-none" : ""}`}
					>
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-zinc-400 transition group-hover:text-zinc-200">
							<link.Icon className="h-4 w-4" />
						</div>
						<div>
							<p className="text-sm font-medium text-zinc-200">
								{link.label}
							</p>
							<p className="font-mono text-xs text-zinc-500">
								{link.sub}
							</p>
						</div>
					</Link>
				))}
			</motion.div>

			{/* direct message (gated) */}
			<motion.section
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45, delay: 0.18 }}
				className="mb-16 rounded-xl border border-white/10 bg-white/4 p-6 backdrop-blur-md"
			>
				<div className="mb-4">
					<p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase mb-2">
						Direct Message
					</p>
					<h2 className="font-display text-lg font-semibold text-zinc-100">
						Send me a message directly
					</h2>
					<p className="mt-1 text-sm text-zinc-500">
						Authenticated users can drop a message here — it gets
						stored directly in my internal contact queue.
					</p>
				</div>

				{isLoading ? (
					<p className="text-sm text-zinc-500">Checking session...</p>
				) : user ? (
					<form onSubmit={onSendMessage} className="space-y-3">
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded border border-white/10 bg-black/25 px-3 py-2">
								<p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
									From
								</p>
								<p className="mt-1 text-sm text-zinc-200">
									{user.name || user.username}
								</p>
							</div>
							<div className="rounded border border-white/10 bg-black/25 px-3 py-2">
								<p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
									Email
								</p>
								<p className="mt-1 truncate text-sm text-zinc-200">
									{user.email}
								</p>
							</div>
						</div>

						<input
							type="text"
							value={subject}
							onChange={(event) => {
								setSubject(event.target.value);
								if (submitState !== "idle") {
									setSubmitState("idle");
									setSubmitMessage("");
								}
							}}
							placeholder="Subject"
							className="w-full rounded border border-white/12 bg-black/25 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-400/60"
						/>
						<textarea
							value={message}
							onChange={(event) => {
								setMessage(event.target.value);
								if (submitState !== "idle") {
									setSubmitState("idle");
									setSubmitMessage("");
								}
							}}
							placeholder="What are you building, and where can I help?"
							rows={5}
							className="w-full resize-y rounded border border-white/12 bg-black/25 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-400/60"
						/>
						{submitState !== "idle" && (
							<div
								className={`flex items-center gap-2 rounded border px-3 py-2 text-xs ${
									submitState === "success"
										? "border-emerald-400/35 bg-emerald-500/10 text-emerald-200"
										: "border-rose-400/35 bg-rose-500/10 text-rose-200"
								}`}
							>
								{submitState === "success" ? (
									<CircleCheck className="h-3.5 w-3.5" />
								) : (
									<CircleAlert className="h-3.5 w-3.5" />
								)}
								<span>{submitMessage}</span>
							</div>
						)}
						<div className="flex items-center justify-between gap-3">
							<p className="text-xs text-zinc-500">
								Stored as an authenticated contact request.
							</p>
							<button
								type="submit"
								disabled={
									!message.trim() ||
									!subject.trim() ||
									isSubmitting
								}
								className="rounded border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{isSubmitting ? (
									<span className="inline-flex items-center gap-1.5">
										<Loader2 className="h-3.5 w-3.5 animate-spin" />
										Submitting...
									</span>
								) : (
									"Send message"
								)}
							</button>
						</div>
					</form>
				) : (
					<div className="rounded border border-blue-400/30 bg-blue-500/10 p-4">
						<p className="text-sm text-blue-100">
							Please log in to send a direct message from this
							page.
						</p>
						<a
							href={authHref}
							className="mt-3 inline-flex items-center rounded border border-blue-300/40 bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-100 transition hover:bg-blue-500/25"
						>
							Log in with Accounts
						</a>
					</div>
				)}
			</motion.section>

			{/* hiring mindset */}
			<div className="mb-14">
				<h2 className="font-display text-lg font-semibold text-zinc-200 mb-2">
					Hiring Mindset
				</h2>
				<p className="text-sm text-zinc-500 mb-6">
					What I look for in a team — and what you can expect from me.
				</p>
				<div className="grid gap-4 md:grid-cols-3">
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
								transition={{
									duration: 0.45,
									delay: index * 0.1,
								}}
								className={`rounded-xl p-6 backdrop-blur-md transition-all duration-300 ${borderClass} ${bgClass}`}
							>
								<div
									className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
								>
									<Icon className="h-4.5 w-4.5" />
								</div>
								<h3 className="mt-3 font-display text-base font-semibold text-zinc-100">
									{item.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-zinc-400">
									{item.body}
								</p>
							</motion.article>
						);
					})}
				</div>
			</div>

			{/* availability CTA */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.45 }}
				className="grad-border-emerald rounded-xl bg-emerald-950/10 p-8 backdrop-blur-md"
			>
				<div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase mb-2">
							Open to opportunities
						</p>
						<h3 className="font-display text-xl font-semibold text-zinc-100">
							Currently exploring staff/lead roles.
						</h3>
						<p className="mt-1 text-sm text-zinc-400">
							Based in {PERSONAL.location}. Remote-friendly.
						</p>
					</div>
					<div className="flex shrink-0 flex-wrap gap-3">
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
							className="flex items-center gap-2 rounded border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/30"
						>
							<Github className="h-4 w-4" />
							GitHub
						</a>
					</div>
				</div>
			</motion.div>
		</PageShell>
	);
}
