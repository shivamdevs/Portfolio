"use client";

import { Github, Mail, FileText } from "lucide-react";

import { EXTERNAL_LINKS, PERSONAL } from "@/lib/constants";

export function Footer() {
	return (
		<footer className="relative z-10 border-t border-white/8 bg-[#03050a]/60 backdrop-blur-sm">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row md:px-10">
				<div>
					<p className="font-display text-sm font-semibold text-zinc-300">
						ShivamDevs
					</p>
					<p className="font-mono text-xs text-zinc-600 mt-0.5">
						&copy; {new Date().getFullYear()} \u00b7{" "}
						{PERSONAL.location} \u00b7 Built with Next.js &amp; Bun
					</p>
				</div>
				<div className="flex items-center gap-4">
					<a
						href={EXTERNAL_LINKS.github}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-200"
					>
						<Github className="h-3.5 w-3.5" /> GitHub
					</a>
					<a
						href={EXTERNAL_LINKS.contact}
						className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-200"
					>
						<Mail className="h-3.5 w-3.5" /> hi@shivamdevs.com
					</a>
					<a
						href={EXTERNAL_LINKS.resume}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-200"
					>
						<FileText className="h-3.5 w-3.5" /> Resume
					</a>
				</div>
			</div>
		</footer>
	);
}
