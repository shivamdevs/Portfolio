const env = process.env;

export const IS_PROD = env.NODE_ENV === "production";

export const SITE_BASE_URL = env.NEXT_PUBLIC_SITE_URL ??
	(IS_PROD ? "https://shivamdevs.com" : "http://localhost:4011");

export const ACCOUNTS_BASE_URL = env.NEXT_PUBLIC_ACCOUNTS_URL ??
	(IS_PROD ? "https://accounts.shivamdevs.com" : "http://localhost:4010");

export const PB_BASE_URL = env.POCKETBASE_URL ?? env.NEXT_PUBLIC_PB_URL ??
	"http://localhost:8090";

export const PROFILE_BASE_URL = env.NEXT_PUBLIC_PROFILE_URL ??
	(IS_PROD ? "https://profile.shivamdevs.com" : "http://localhost:4012");

export const PERSONAL = {
	name: "Shivam Dewangan",
	username: "ShivamDevs",
	role: "Full Stack Engineer (Lead)",
	location: "Bangalore, KA",
	education: "B.Tech CSE · Lovely Professional University · 2024",
} as const;

export const HERO = {
	heading: "I build and scale the engines of modern startups.",
	subheading:
		"Founding Engineer at Collective Artists Network. Fast-tracked from intern to Technical Lead in under 12 months. I own the infrastructure, the data, and the team that ships it.",
	ctaLabel: "View System Architecture",
} as const;

export const SYSTEM_METRICS = [
	{ value: "10M+", label: "Records Architected", accent: "emerald" },
	{ value: "0.5s–2s", label: "API Latency After Opt.", accent: "blue" },
	{ value: "20+", label: "Technical Interviews", accent: "violet" },
	{ value: "< 12mo", label: "Intern → Tech Lead", accent: "amber" },
] as const;

export const CORE_SKILLS = [
	"AWS",
	"EKS",
	"Docker",
	"Python",
	"Dagster",
	"PostgreSQL",
	"Next.js",
	"React",
	"TypeScript",
] as const;

export const DASHBOARD_CARDS = [
	{
		title: "Infrastructure",
		accent: "emerald" as const,
		stack: ["AWS", "EKS", "Docker", "CI/CD"],
		metricLabel: "Uptime",
		metricValue: "99.9%",
		detail:
			"AWS root ownership. VPCs, EKS clusters, self-hosted runners, and FinOps strategy across production.",
		icon: "⬡",
	},
	{
		title: "Data Engine",
		accent: "violet" as const,
		stack: ["Python", "Dagster", "Athena", "PostgreSQL"],
		metricLabel: "Scale",
		metricValue: "10M+ rec",
		detail:
			"Data lake built on Dagster + AWS Athena. Orchestrated pipelines handling 10M+ records end-to-end.",
		icon: "◈",
	},
	{
		title: "Frontend",
		accent: "blue" as const,
		stack: ["Next.js", "React Native", "Tailwind", "TypeScript"],
		metricLabel: "Latency",
		metricValue: "0.5s API",
		detail:
			"Shipped consumer apps (Your Forevers, Mini Mindful Moments) and internal tooling with polished UX.",
		icon: "◇",
	},
] as const;

export const TIMELINE = [
	{
		role: "Engineering Lead",
		company: "Collective Artists Network",
		period: "2024 – Present",
		achievement:
			"Grew from IC to Lead in under 12 months. Hired and onboarded a pod of 3 engineers. Conducted 20+ technical interviews. FinOps initiatives cut infrastructure burn significantly.",
		tags: ["Leadership", "Hiring", "FinOps", "Team of 3"],
	},
	{
		role: "Founding Full Stack Engineer",
		company: "Collective Artists Network",
		period: "2024",
		achievement:
			"Architected data platforms handling 10M+ records. Built the Data Platform on Dagster + AWS Athena. Owned full AWS root access in production.",
		tags: ["Dagster", "AWS Athena", "EKS", "Data Platform"],
	},
	{
		role: "Acquisition",
		company: "Collective Artists Network · Strategic Milestone",
		period: "Late 2023",
		achievement:
			"Retained as a core engineer through acquisition. Tasked with building the new technical foundation for the merged organization.",
		tags: ["AWS", "Architecture", "Migration"],
	},
	{
		role: "Software Engineer Intern",
		company: "Terribly Tiny Tales (TTT)",
		period: "2023",
		achievement:
			"Shipped foundational automation workflows and contributed to content platform features from day one. Where the obsession with zero-to-one started.",
		tags: ["React", "Node.js", "PostgreSQL"],
	},
] as const;

export const PROJECTS = [
	{
		name: "Data Platform",
		type: "Internal Infrastructure",
		accent: "violet" as const,
		tech: ["Dagster", "AWS Athena", "Python", "S3"],
		description:
			"Event-driven data orchestration platform ingesting and transforming 10M+ records. Built on Dagster for workflow reliability and AWS Athena for serverless analytics at scale.",
		impact: "10M+ records · serverless analytics · production",
	},
	{
		name: "HookPulse",
		type: "Webhooks · Developer Tooling",
		accent: "emerald" as const,
		tech: ["Deno", "WebSockets", "Next.js", "TypeScript"],
		description:
			"Real-time webhook inspector and debugger. Listens, replays and filters incoming webhook events over WebSocket — no tunneling tools needed.",
		impact: "Sub-100ms relay · real-time · OSS",
	},
	{
		name: "Your Forevers",
		type: "Consumer Product",
		accent: "blue" as const,
		tech: ["React Native", "Next.js", "Tailwind"],
		description:
			"Polished consumer app in the emotional-content space. Responsible for full-stack product delivery from design token to App Store release.",
		impact: "Cross-platform · App Store · user-facing",
	},
	{
		name: "Mini Mindful Moments",
		type: "Consumer Product",
		accent: "amber" as const,
		tech: ["React Native", "Next.js", "TypeScript"],
		description:
			"Mindfulness micro-app built for daily habit loops. Shipped entirely in-house. Demonstrates end-to-end ownership from concept to production.",
		impact: "Mobile-first · habit UX · zero-to-one",
	},
] as const;

export const HIRING_MINDSET = [
	{
		title: "Compounding DNA",
		icon: "⬡",
		body:
			"The first 5 hires define a startup's trajectory. I look for owners, not coders — people who treat the codebase, the infra, and the product as their own.",
	},
	{
		title: "Pragmatic Architecture",
		icon: "◈",
		body:
			"I choose tools that reduce the distance between idea and production. Dagster for orchestration, Bun for speed. The right abstraction beats the popular one.",
	},
	{
		title: "Zero-to-One Mindset",
		icon: "◇",
		body:
			"I thrive in ambiguity. I set up the VPC, write the first CI pipeline, and ship the first React component — often in the same week.",
	},
] as const;

export const EXTERNAL_LINKS = {
	github: "https://github.com/ShivamDevs",
	linkedin: "https://www.linkedin.com/in/shivamdevs",
	website: SITE_BASE_URL,
	accounts: ACCOUNTS_BASE_URL,
	resume: "/resume.pdf",
	contact: "mailto:hi@shivamdevs.com",
	location: "https://maps.app.goo.gl/hjgQjMUDgmDf2jvi9",
} as const;

export const AUTH_LINKS = {
	profile: `${PROFILE_BASE_URL}`,
	logout(continueUrl: string): string {
		return `${ACCOUNTS_BASE_URL}/logout?continue=${
			encodeURIComponent(continueUrl)
		}`;
	},
};

export function buildAccountsAuthUrl(continueUrl: string): string {
	return `${ACCOUNTS_BASE_URL}/auth?continue=${
		encodeURIComponent(continueUrl)
	}`;
}
