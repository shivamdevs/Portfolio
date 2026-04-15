import type { MetadataRoute } from "next";

import { listPublishedPosts } from "@/lib/blog/repository";
import { buildPostPath } from "@/lib/blog/utils";

const siteUrl = "https://shivamdevs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date();
	const publishedPosts = await listPublishedPosts().catch(() => []);
	const blogRoutes = publishedPosts.map((post) => ({
		url: `${siteUrl}${buildPostPath(post.author.username, post.slug)}`,
		lastModified: post.updated ? new Date(post.updated) : lastModified,
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	return [
		{
			url: siteUrl,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${siteUrl}/blogs`,
			lastModified,
			changeFrequency: "daily",
			priority: 0.95,
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
		...blogRoutes,
	];
}
