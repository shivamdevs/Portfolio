"use client";

import { CORE_SKILLS } from "@/lib/constants";
import { Cpu } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function LoadingSequence({ loaded }: { loaded: boolean }) {
	const [shownSkills, setShownSkills] = useState(0);

	useEffect(() => {
		if (loaded) return;

		const timer = window.setInterval(() => {
			setShownSkills((prev) => {
				if (prev >= CORE_SKILLS.length) {
					window.clearInterval(timer);
					return prev;
				}
				return prev + 1;
			});
		}, 110);

		return () => window.clearInterval(timer);
	}, [loaded]);

	if (loaded) return null;

	return (
		<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
			<div className="w-full max-w-lg rounded-xl border border-emerald-500/25 bg-[#040a08]/95 p-5 font-mono text-xs text-emerald-300 shadow-[0_0_60px_-10px_rgb(0_208_132/0.2)]">
				<div className="mb-3 flex items-center gap-2">
					<Cpu className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
					<span className="text-emerald-200 text-[11px] tracking-[0.2em] uppercase">
						System Initializing
					</span>
				</div>
				<div className="space-y-1 text-[11px]">
					{CORE_SKILLS.slice(0, shownSkills).map((skill) => (
						<p key={skill} className="text-emerald-400/80">
							<span className="text-emerald-600 mr-2">›</span>
							loading module:{" "}
							<span className="text-emerald-200">{skill}</span>
						</p>
					))}
					{shownSkills < CORE_SKILLS.length && (
						<p className="animate-pulse text-emerald-600">
							<span className="text-emerald-600 mr-2">›</span>
							awaiting neural data flow...
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
