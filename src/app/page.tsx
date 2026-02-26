import { CommandPalette } from "@/components/interaction/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HiringMindsetSection } from "@/components/sections/HiringMindsetSection";
import { LabSection } from "@/components/sections/LabSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

export default function Home() {
	return (
		<div className="relative min-h-screen bg-background text-foreground">
			{/* Fixed ambient gradient orbs — provide color for glassmorphism cards */}
			<div
				className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
				aria-hidden="true"
			>
				<div className="absolute -top-60 -left-60 h-162.5 w-162.5 rounded-full bg-emerald-500/10 blur-[140px]" />
				<div className="absolute top-1/3 -right-48 h-125 w-125 rounded-full bg-blue-500/9 blur-[120px]" />
				<div className="absolute bottom-1/4 left-1/3 h-100 w-100 rounded-full bg-violet-500/8 blur-[100px]" />
				<div className="absolute bottom-0 right-1/4 h-75 w-75 rounded-full bg-amber-500/6 blur-[90px]" />
			</div>
			<Nav />
			<main className="relative z-10">
				<HeroSection />
				<DashboardSection />
				<TimelineSection />
				<LabSection />
				<HiringMindsetSection />
			</main>
			<Footer />
			<CommandPalette />
		</div>
	);
}
