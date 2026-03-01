import type { MetadataRoute } from "next";

const siteUrl = "https://shivamdevs.com";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return [
		{
			url: siteUrl,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${siteUrl}/journey`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${siteUrl}/lab`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${siteUrl}/dashboard`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${siteUrl}/contact`,
			lastModified,
			changeFrequency: "yearly",
			priority: 0.6,
		},
	];
}
