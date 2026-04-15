const slugSanitizer = /[^a-z0-9]+/g;

export function toSlug(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(slugSanitizer, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-{2,}/g, "-")
		.slice(0, 180);
}

export function buildPostPath(username: string, slug: string): string {
	return `/blogs/${encodeURIComponent(username)}/${encodeURIComponent(slug)}`;
}

export function summarizeContent(content: string, maxLength = 160): string {
	const compact = content.replace(/\s+/g, " ").trim();
	if (compact.length <= maxLength) return compact;
	return `${compact.slice(0, maxLength - 1).trim()}…`;
}
