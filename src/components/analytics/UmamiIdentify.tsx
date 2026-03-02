"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { useEffect } from "react";

/**
 * Silently identifies the logged-in PocketBase user inside Umami.
 * Calls `umami.identify({ userId, username, role })` once the session
 * resolves and the Umami script has loaded.
 *
 * Mount once at the root layout — renders nothing.
 */
export function UmamiIdentify() {
	const { user, isLoading } = useAuthSession();

	useEffect(() => {
		if (isLoading) return;
		if (!user) return;

		const identify = () => {
			window.umami?.identify(user.id, {
				username: user.username,
				email: user.email,
				name: user.name,
				role: user.role,
			});
		};

		// umami may still be loading (lazyOnload strategy); retry until ready
		if (window.umami) {
			identify();
		} else {
			const interval = setInterval(() => {
				if (window.umami) {
					identify();
					clearInterval(interval);
				}
			}, 300);

			// give up after 10 s to avoid leaking the interval
			const timeout = setTimeout(() => clearInterval(interval), 10_000);

			return () => {
				clearInterval(interval);
				clearTimeout(timeout);
			};
		}
	}, [user, isLoading]);

	return null;
}
