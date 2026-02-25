"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FileText, Menu, X, Github, Mail } from "lucide-react";

import { EXTERNAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Journey", href: "/journey" },
	{ label: "Lab", href: "/lab" },
	{ label: "Contact", href: "/contact" },
];

export function Nav() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === "/";

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleNavClick = () => setMobileOpen(false);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-40 transition-all duration-300",
				scrolled
					? "border-b border-white/8 bg-[#03050a]/85 backdrop-blur-lg"
					: "bg-transparent",
				mobileOpen &&
					"bg-[#03050a]/95 backdrop-blur-lg border-b border-white/8",
			)}
		>
			<div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 md:px-10">
				{/* wordmark */}
				<Link
					href={isHome ? "#hero" : "/"}
					className="group flex items-center gap-2"
				>
					<span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgb(0_208_132/0.5)]" />
					<span className="font-display text-sm font-semibold tracking-tight text-zinc-100">
						ShivamDevs
					</span>
				</Link>

				{/* links (desktop) */}
				<nav className="hidden items-center gap-6 md:flex">
					{NAV_LINKS.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"text-sm transition",
									isActive
										? "text-zinc-100 font-medium"
										: "text-zinc-400 hover:text-zinc-100",
								)}
							>
								{link.label}
								{isActive && (
									<span className="ml-1 inline-block h-1 w-1 rounded-full bg-emerald-400 align-middle" />
								)}
							</Link>
						);
					})}
				</nav>

				{/* right side */}
				<div className="flex items-center gap-2">
					<a
						href={EXTERNAL_LINKS.github}
						target="_blank"
						rel="noreferrer"
						title="GitHub"
						className="hidden md:flex h-8 w-8 items-center justify-center rounded text-zinc-500 transition hover:text-zinc-200"
					>
						<Github className="h-4 w-4" />
					</a>
					<a
						href={EXTERNAL_LINKS.contact}
						title="Email"
						className="hidden md:flex h-8 w-8 items-center justify-center rounded text-zinc-500 transition hover:text-zinc-200"
					>
						<Mail className="h-4 w-4" />
					</a>
					<a
						href={EXTERNAL_LINKS.resume}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-1.5 rounded border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-400/60"
					>
						<FileText className="h-3 w-3" />
						Resume
					</a>
					<button
						type="button"
						onClick={() => setMobileOpen((v) => !v)}
						className="flex h-8 w-8 items-center justify-center rounded text-zinc-400 transition hover:text-zinc-100 md:hidden"
						aria-label="Toggle menu"
					>
						{mobileOpen ? (
							<X className="h-4 w-4" />
						) : (
							<Menu className="h-4 w-4" />
						)}
					</button>
				</div>
			</div>

			{/* mobile drawer */}
			{mobileOpen && (
				<nav className="border-t border-white/8 px-6 pb-4 pt-2 md:hidden">
					{NAV_LINKS.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								onClick={handleNavClick}
								className={cn(
									"block py-2.5 text-sm transition",
									isActive
										? "text-zinc-100 font-medium"
										: "text-zinc-300 hover:text-zinc-100",
								)}
							>
								{link.label}
							</Link>
						);
					})}
					<div className="mt-3 flex gap-4 pt-2 border-t border-white/6">
						<a
							href={EXTERNAL_LINKS.github}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
						>
							<Github className="h-3.5 w-3.5" /> GitHub
						</a>
						<a
							href={EXTERNAL_LINKS.contact}
							className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
						>
							<Mail className="h-3.5 w-3.5" /> Email
						</a>
					</div>
				</nav>
			)}
		</header>
	);
}
