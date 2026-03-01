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
		period: "Sept 2024 – Present",
		achievement:
			"Scaled from IC to Technical Lead in under 12 months. Hired a pod of 3 engineers via 20+ technical interviews. Entrusted with AWS root access. Standardized Docker/K8s across all projects.",
		tags: ["Leadership", "Hiring", "AWS Root", "K8s", "FinOps"],
	},
	{
		role: "Founding Full Stack Engineer",
		company: "Collective Artists Network",
		period: "Sept 2024",
		achievement:
			"Built the post-acquisition technical foundation from zero — VPCs, EKS clusters, CI/CD, and the initial data platform. Managed a data lake of 10M+ records with sub-2s query performance.",
		tags: ["EKS", "Dagster", "StarRocks", "Athena", "FastAPI"],
	},
	{
		role: "Acquisition — Retained Engineer",
		company: "Collective Artists Network",
		period: "Aug 2024",
		achievement:
			"Retained through the TTT acquisition by Collective Artists Network based on high-impact delivery. Tasked with architecting the new technical foundation for the merged organization.",
		tags: ["Acquisition", "Architecture", "Migration"],
	},
	{
		role: "Software Engineer Intern",
		company: "Terribly Tiny Tales (TTT)",
		period: "Dec 2023 – Aug 2024",
		achievement:
			"Delivered a GenAI video pipeline (Hershey's collab) in 2 months. Managed Academy platform migrations with 99.9% uptime. Shipped Mini Mindful Moments under high-traffic load.",
		tags: ["Next.js", "React Native", "OpenAI", "FFmpeg", "AWS Lambda"],
	},
] as const;

export const COMPANIES = [
	{
		id: "collective-artists-network",
		name: "Collective Artists Network",
		shortName: "CAN",
		period: "Sept 2024 – Present",
		location: "Bangalore, India",
		accent: "emerald" as const,
		summary:
			"Transitioned from a retained acquisition engineer to Technical Lead in under 12 months. Built the entire production cloud architecture from scratch — VPCs, EKS clusters, data pipelines, and consumer products — while growing and managing a pod of 3 engineers.",
		highlights: [
			"10M+ records managed",
			"70% manual overhead cut",
			"50% release time reduction",
			"20+ technical interviews",
		],
		roles: [
			{
				title: "Engineering Lead",
				period: "Sept 2024 – Present",
				description:
					"Scaled from IC to Technical Lead in under 12 months. Directly responsible for hiring and onboarding the current 3-person engineering pod via 20+ technical interviews. Entrusted with root-level administrative access for all production AWS environments. Standardized Docker and Kubernetes across all new projects for environment parity and horizontal scalability.",
				tags: [
					"Leadership",
					"Hiring",
					"AWS Root",
					"K8s",
					"FinOps",
					"Team of 3",
				],
			},
			{
				title: "Founding Full Stack Engineer",
				period: "Sept 2024",
				description:
					"Architected the post-acquisition technical foundation from zero — setting up VPCs, EKS clusters, CI/CD pipelines, and the initial data platform. Owned the entire production stack end-to-end.",
				tags: ["EKS", "AWS", "CI/CD", "Data Platform", "Zero-to-One"],
			},
			{
				title: "Acquisition — Retained Engineer",
				period: "Aug 2024",
				description:
					"Retained as a core engineer through the TTT acquisition by Collective Artists Network based on high-impact delivery. Tasked with building the new technical foundation for the merged organization.",
				tags: ["Architecture", "Migration", "Acquisition"],
			},
		],
		projects: [
			{
				name: "Enterprise Data Platform",
				type: "Internal Infrastructure",
				period: "Mar 2025 – Dec 2025",
				description:
					'Architected a next-generation ELT/DLT pipeline to solve the "Fragmented Creator Data" problem. Built on EKS + Dagster for orchestration, StarRocks + Athena for analytics. Managed a data lake of 10M+ records and optimized complex analytical queries from minutes to sub-2s response times.',
				stack: [
					"EKS",
					"Kubernetes",
					"Dagster",
					"Docker",
					"StarRocks",
					"Athena",
					"FastAPI",
					"PostgreSQL",
				],
				impact: "10M+ records · queries: minutes → sub-2s · production",
			},
			{
				name: "BBS (BigBang.Social) Brand Campaigns Platform",
				type: "Full Stack Product",
				period: "Mar 2025 – Jun 2025",
				description:
					"Built the end-to-end onboarding and campaign management engine for global brands. Developed a secure, automated payment and status-tracking gateway that streamlined brand-to-talent collaboration.",
				stack: [
					"Python",
					"Django",
					"PostgreSQL",
					"React",
					"Vite",
					"MUI",
				],
				impact:
					"70% manual overhead reduction · payment automation · brand-talent ops",
			},
			{
				name: "Talent Tech & Ecosystem",
				type: "Internal Platform",
				period: "Sept 2024 – Mar 2025",
				description:
					"Designed the internal operating system for talent managers. Successfully migrated legacy talent data into a high-performance React/Django environment, ensuring 100% data integrity during the post-acquisition transition.",
				stack: ["React", "Django", "PostgreSQL", "TypeScript"],
				impact: "100% data integrity · legacy migration · talent ops",
			},
			{
				name: "Bruised Passports",
				type: "Mobile & DevOps",
				period: "Jan 2025 – Present",
				description:
					"Led mobile engineering and DevOps for a travel content platform. Built custom Jenkins pipelines for both iOS and Android, automating Dev/Prod environments and revolutionizing the deployment lifecycle.",
				stack: ["React Native", "Strapi", "Jenkins", "iOS", "Android"],
				impact:
					"50% release time reduction · CI/CD automation · multi-env",
			},
		],
	},
	{
		id: "terribly-tiny-tales",
		name: "Terribly Tiny Tales",
		shortName: "TTT",
		period: "Dec 2023 – Aug 2024",
		location: "Remote",
		accent: "blue" as const,
		summary:
			"Joined as a Software Engineering Intern at a high-velocity Creative-Tech startup. Delivered zero-to-one product launches and critical platform migrations from day one — directly leading to retention through the Collective Artists Network acquisition.",
		highlights: [
			"GenAI pipeline zero-to-one",
			"99.9% uptime during peak enrollment",
			"Retained through acquisition",
		],
		roles: [
			{
				title: "Software Engineer Intern",
				period: "Dec 2023 – Aug 2024",
				description:
					"Contributed to four production products across AI, mobile, and web. Delivered a complex Generative AI video pipeline under a 2-month deadline in collaboration with Hershey's. Handled critical payment provider migrations and maintained 99.9% uptime during peak Academy enrollment. Retained by Collective Artists Network through the acquisition based on high-impact delivery.",
				tags: [
					"Next.js",
					"React Native",
					"Express",
					"AWS Lambda",
					"OpenAI",
					"FFmpeg",
				],
			},
		],
		projects: [
			{
				name: "Yours Forever",
				type: "AI Product · Hershey's Collab",
				period: "2024",
				description:
					"Engineered a complex Generative AI pipeline for a high-profile Hershey's collaboration. Transformed text prompts into fully orchestrated videos: Storyboarding → Voice Gen (Suno AI) → Image Gen (OpenAI) → FFmpeg video assembly. Zero-to-one launch delivered under a tight 2-month deadline.",
				stack: [
					"Next.js",
					"Express",
					"AWS Lambda",
					"OpenAI",
					"Suno AI",
					"FFmpeg",
				],
				impact:
					"Zero-to-one · GenAI pipeline · 2-month deadline · brand collab",
			},
			{
				name: "TTT Academy & Academy App",
				type: "Full Stack & Mobile",
				period: "Feb 2024 – Sept 2024",
				description:
					"Managed the end-to-end Academy portal and mobile app. Handled a critical migration of payment provider integrations and UI overhauls, maintaining 99.9% uptime during peak enrollment periods.",
				stack: ["Next.js", "React Native", "Expo", "Express"],
				impact: "99.9% uptime · payment migration · mobile + web",
			},
			{
				name: "Mini Mindful Moments",
				type: "Consumer Product · Valentine's Day Collab",
				period: "2024",
				description:
					"Built a high-traffic card generation platform for a Valentine's Day brand collaboration. Scaled to handle thousands of concurrent users creating and sharing digital collaborations in real-time.",
				stack: ["Next.js", "Express.js"],
				impact: "High-traffic · real-time sharing · brand collab",
			},
			{
				name: "Centralized Admin Dashboard",
				type: "Internal Tooling",
				period: "Dec 2023 – Sept 2024",
				description:
					'Primary maintainer of the "Control Center" for the TTT team. Consistently iterated on features for user management, content moderation, and daily operations — the backbone the company ran on.',
				stack: ["React", "Node.js", "PostgreSQL"],
				impact:
					"Daily ops backbone · content moderation · user management",
			},
		],
	},
] as const;

export const PROJECTS = [
	{
		id: "data-platform",
		name: "Enterprise Data Intelligence Platform",
		shortLabel: "Data Platform",
		type: "Internal Infrastructure · SSOT",
		accent: "violet" as const,
		status: "Production-Active",
		tech: [
			"Dagster",
			"EKS",
			"Kubernetes",
			"StarRocks",
			"AWS Athena",
			"FastAPI",
			"Docker",
			"PostgreSQL",
			"Python",
		],
		problem:
			"Fragmented creator data scattered across 5+ social APIs and legacy databases caused 30s+ manual report generation, blocking strategic decisions at scale.",
		solution:
			"High-throughput ELT/DLT pipeline using Dagster orchestration and EKS compute, with a unified OLAP layer (StarRocks + Athena) serving as the Single Source of Truth.",
		description:
			"Architected and owned the core data infrastructure for a creator-economy platform processing records at scale. Designed the full Ingest → Transform → Serve lifecycle — from raw API ingestion to queryable OLAP tables — enabling analysts and product teams to self-serve insights in seconds.",
		wowFactor: [
			"10M+ records ingested, normalized, and queryable",
			"Query time: 30+ minutes → <2 seconds",
			"Fully automated Ingest-Transform-Serve lifecycle",
		],
		impact: "10M+ records · minutes → <2s · production",
	},
	{
		id: "hookpulse",
		name: "HookPulse",
		shortLabel: "HookPulse",
		type: "Web App · Developer Tooling",
		accent: "emerald" as const,
		status: "Personal Project",
		tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
		problem:
			"Debugging incoming webhooks during development means manual logging, repeated deploys, and no easy way to replay past events.",
		solution:
			"A Next.js web dashboard where you can forward webhook payloads, inspect request headers and bodies, replay events, and track delivery history — all in the browser.",
		description:
			"A browser-based webhook inspection tool. Forward your webhook endpoint to HookPulse, and every incoming request is logged with full headers and payload in a clean dashboard. Replay any past event with one click, no tunneling tools required.",
		wowFactor: [
			"Full request/response inspection in the browser",
			"One-click event replay from history",
			"PostgreSQL-backed delivery log",
		],
		impact: "Browser-based · replay engine · personal project",
	},
	{
		id: "codeplay",
		name: "CodePlay",
		shortLabel: "CodePlay",
		type: "Web App · Personal Project",
		accent: "blue" as const,
		status: "Personal Project",
		tech: ["Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS/JS"],
		problem:
			"Prototyping and sharing small HTML/CSS/JS snippets requires spinning up a project or relying on external tools with heavy sign-up flows.",
		solution:
			"A browser-based IDE with a split editor and live preview pane. Code is rendered instantly in an iframe via blob URL generation — no server, no build step.",
		description:
			"A lightweight in-browser IDE for HTML, CSS, and JavaScript. Write code on the left, see the live output on the right. Output is rendered via dynamically generated blob URLs, keeping everything local and instant.",
		wowFactor: [
			"Live iframe preview via blob URL generation",
			"Split editor with instant feedback",
			"No backend — fully client-side rendering",
		],
		impact: "Client-side · live preview · personal project",
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
