"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GithubIcon, Loader2, LogOutIcon, User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useAuthSession } from "@/hooks/useAuthSession";
import {
	AUTH_LINKS,
	buildAccountsAuthUrl,
	EXTERNAL_LINKS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Journey", href: "/journey" },
	{ label: "Lab", href: "/lab" },
	{ label: "Contact", href: "/contact" },
];

export function Nav() {
	const [scrolled, setScrolled] = useState(false);

	const pathname = usePathname();
	const isHome = pathname === "/";
	const currentHref =
		typeof window === "undefined"
			? EXTERNAL_LINKS.website
			: window.location.href;
	const authHref = buildAccountsAuthUrl(currentHref);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-40 transition-all duration-300",
				scrolled
					? "border-b border-white/8 bg-[#03050a]/85 backdrop-blur-lg"
					: "bg-transparent",
			)}
		>
			<div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 md:px-10">
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

				<div className="flex items-center gap-2">
					<Link
						href={EXTERNAL_LINKS.github}
						target="_blank"
						rel="noreferrer"
						title="GitHub"
						className="hidden md:flex h-8 w-8 items-center justify-center rounded text-zinc-500 transition hover:text-zinc-200"
					>
						<GithubIcon className="h-4 w-4" />
					</Link>
					<AuthSession
						authHref={authHref}
						currentHref={currentHref}
					/>
				</div>
			</div>
		</header>
	);
}

function AuthSession({
	authHref,
	currentHref,
}: {
	authHref: string;
	currentHref: string;
}) {
	const { user, isAuthenticated, isLoading } = useAuthSession();
	const logoutHref = AUTH_LINKS.logout(currentHref);

	if (isLoading) {
		return (
			<div className="hidden md:flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400">
				<Loader2 className="h-3.5 w-3.5 animate-spin" />
			</div>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<Button
				variant="outline"
				size="sm"
				className="hidden md:inline-flex border-blue-400/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/60 cursor-pointer"
				asChild
			>
				<Link href={authHref}>Sign in</Link>
			</Button>
		);
	}

	const displayName = user.name?.trim() || user.username;
	const displayInitial = displayName.charAt(0).toUpperCase() || "U";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-full border border-blue-400/45 bg-blue-500/12 p-0.5 transition hover:border-blue-300/70 cursor-pointer">
				<Avatar size="sm">
					<AvatarImage src={user.avatarUrl} alt={user.username} />
					<AvatarFallback>{displayInitial}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="min-w-64 border-white/12 bg-zinc-950/95 text-zinc-100 backdrop-blur-xl"
				align="end"
			>
				<DropdownMenuLabel className="py-2">
					<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-1">
						Signed in
					</p>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={user.avatarUrl}
								alt={user.username}
							/>
							<AvatarFallback>{displayInitial}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<span className="text-sm font-medium">
								{displayName}
							</span>
							<span className="text-xs text-zinc-400">
								@{user.username}
							</span>
							<span className="text-xs text-zinc-500 truncate max-w-44">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="focus:bg-zinc-900" asChild>
					<Link href={AUTH_LINKS.profile}>
						<User2Icon className="h-4 w-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="focus:bg-zinc-900" asChild>
					<Link href={logoutHref}>
						<LogOutIcon className="h-4 w-4" />
						Log Out
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
