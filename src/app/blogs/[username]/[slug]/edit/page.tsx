import { notFound, redirect } from "next/navigation";

import { PostComposer } from "@/components/blog/PostComposer";
import { PageShell } from "@/components/layout/PageShell";
import { canEditPost } from "@/lib/auth/roles";
import { getPostByUsernameAndSlug } from "@/lib/blog/repository";
import { getAuthSession } from "@/lib/session";

export default async function EditPostPage({
	params,
}: {
	params: Promise<{ username: string; slug: string }>;
}) {
	const resolved = await params;
	const post = await getPostByUsernameAndSlug(resolved.username, resolved.slug);
	if (!post) {
		notFound();
	}

	const session = await getAuthSession();
	if (!session?.record?.id) {
		redirect(`/blogs/${encodeURIComponent(resolved.username)}/${encodeURIComponent(resolved.slug)}`);
	}

	if (!canEditPost(post.authorId, session.record)) {
		notFound();
	}

	return (
		<PageShell breadcrumb="Edit Blog Post" accent="amber">
			<div className="mb-6 max-w-3xl">
				<h1 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">Edit post</h1>
				<p className="mt-2 text-zinc-400">Update title, excerpt, content, and publish state. Drafts stay private until you publish.</p>
			</div>
			<div className="max-w-3xl">
				<PostComposer mode="edit" postId={post.id} initialPost={post} />
			</div>
		</PageShell>
	);
}
