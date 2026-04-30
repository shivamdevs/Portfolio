import Link from "next/link";

import { PostComposer } from "@/components/blog/PostComposer";
import { PageShell } from "@/components/layout/PageShell";
import { buildAccountsAuthUrl, SITE_BASE_URL } from "@/lib/constants";
import { getAuthSession } from "@/lib/session";

export default async function NewBlogPostPage() {
	const session = await getAuthSession();

	if (!session?.record?.id) {
		const authHref = buildAccountsAuthUrl(`${SITE_BASE_URL}/blogs/new`);
		return (
			<PageShell breadcrumb="Blogs" accent="blue">
				<div className="max-w-3xl rounded-xl border border-white/12 bg-zinc-950/65 p-7 backdrop-blur">
					<h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Sign in required</h1>
					<p className="mt-3 text-zinc-400">
						Any authenticated user can publish or save drafts.
					</p>
					<Link
						href={authHref}
						className="mt-5 inline-flex rounded border border-blue-400/45 bg-blue-500/12 px-4 py-2 text-sm text-blue-100 transition hover:border-blue-300/70 hover:bg-blue-500/24"
					>
						Sign in
					</Link>
				</div>
			</PageShell>
		);
	}

	return (
		<PageShell breadcrumb="New Blog Post" accent="blue">
			<div className="mb-6 max-w-3xl">
				<h1 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">Compose your next post</h1>
				<p className="mt-2 text-zinc-400">Write in Markdown, save drafts, and publish when ready. The editor previews your content as you write.</p>
			</div>
			<div className="max-w-3xl">
				<PostComposer mode="create" />
			</div>
		</PageShell>
	);
}
