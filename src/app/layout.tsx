import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { UmamiIdentify } from "@/components/analytics/UmamiIdentify";
import { ANALYTICS_URL, ANALYTICS_ID } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
	variable: "--font-display",
	subsets: ["latin"],
	axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
	title: "Shivam Dewangan · shivamdevs — Lead Engineer",
	description:
		"Lead Engineer with experience across infrastructure, data systems, and product development.",
	metadataBase: new URL("https://shivamdevs.com"),
};

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Shivam Dewangan",
	url: "https://shivamdevs.com",
	alternateName: "shivamdevs",
	sameAs: [
		"https://github.com/shivamdevs",
		"https://linkedin.com/in/shivamdevs",
		"https://www.npmjs.com/~shivamdevs",
	],
	jobTitle: "Full Stack Engineer",
	description:
		"Shivam Dewangan (shivamdevs) is a lead engineer based in Bangalore, India. Available for work. Experience with Python, Node.js, Next.js, TypeScript, AWS, and data systems at scale.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personSchema),
					}}
				/>
			</head>
			{ANALYTICS_URL && ANALYTICS_ID && (
				<Script
					defer
					src={ANALYTICS_URL}
					data-website-id={ANALYTICS_ID}
					strategy="lazyOnload"
				/>
			)}
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} bg-background text-foreground antialiased`}
			>
				<UmamiIdentify />
				{children}
			</body>
		</html>
	);
}
