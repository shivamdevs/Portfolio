import type { MetadataRoute } from "next";

const siteUrl = "https://shivamdevs.com";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return [
		{
			url: siteUrl,
			lastModified,
			changeFrequency: "daily",
			priority: 1,
		},
	];
}
