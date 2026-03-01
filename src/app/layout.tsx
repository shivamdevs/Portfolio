import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
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
	title: "Shivam Dewangan · shivamdevs — Full Stack Engineer",
	description:
		"Founding Engineer. Systems, data engines, and high-performance products at scale.",
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
		"Shivam Dewangan (shivamdevs) is a full-stack engineer based in Bangalore, India. Founding engineer with experience in Python, Node.js, Next.js, TypeScript, AWS, and scalable data systems handling 10M+ records.",
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} bg-background text-foreground antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
