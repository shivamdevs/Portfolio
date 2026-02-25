"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { EXTERNAL_LINKS } from "@/lib/constants";

export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				event.key.toLowerCase() === "k" &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				setOpen((prev) => !prev);
			}

			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	const runAction = (action: () => void) => {
		action();
		setOpen(false);
	};

	return (
		<>
			<button
				data-active="true"
				type="button"
				onClick={() => setOpen(true)}
				className="fixed right-4 bottom-4 z-50 rounded-sm border border-white/15 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-200 backdrop-blur-md hover:border-emerald-400/50"
			>
				Cmd + K
			</button>
			{open ? (
				<div
					className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24"
					onClick={() => setOpen(false)}
				>
					<div
						className="w-full max-w-xl"
						onClick={(event) => event.stopPropagation()}
					>
						<Command>
							<CommandInput placeholder="Jump to Resume, GitHub, or Contact..." />
							<CommandList>
								<CommandEmpty>No result found.</CommandEmpty>
								<CommandGroup heading="Quick Actions">
									<CommandItem
										onSelect={() =>
											runAction(() =>
												window.open(
													EXTERNAL_LINKS.resume,
													"_blank",
												),
											)
										}
									>
										Resume
									</CommandItem>
									<CommandItem
										onSelect={() =>
											runAction(() =>
												window.open(
													EXTERNAL_LINKS.github,
													"_blank",
												),
											)
										}
									>
										GitHub
									</CommandItem>
									<CommandItem
										onSelect={() =>
											runAction(() =>
												window.open(
													EXTERNAL_LINKS.contact,
												),
											)
										}
									>
										Email
									</CommandItem>
								</CommandGroup>
								<CommandGroup heading="Navigate">
									<CommandItem
										onSelect={() =>
											runAction(() =>
												router.push("/dashboard"),
											)
										}
									>
										Skills &amp; Dashboard
									</CommandItem>
									<CommandItem
										onSelect={() =>
											runAction(() =>
												router.push("/journey"),
											)
										}
									>
										Career Journey
									</CommandItem>
									<CommandItem
										onSelect={() =>
											runAction(() => router.push("/lab"))
										}
									>
										Projects &amp; Lab
									</CommandItem>
									<CommandItem
										onSelect={() =>
											runAction(() =>
												router.push("/contact"),
											)
										}
									>
										Contact &amp; Hiring
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</div>
				</div>
			) : null}
		</>
	);
}
