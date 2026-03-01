"use client";

import { AuthSessionUser } from "@/lib/session";
import { useEffect, useState } from "react";

type AuthSessionResponse = {
	authenticated: boolean;
	user: AuthSessionUser | null;
	token: string | null;
};

export function useAuthSession() {
	const [user, setUser] = useState<AuthSessionUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		async function run() {
			try {
				const response = await fetch("/api/auth/session", {
					cache: "no-store",
				});

				if (!response.ok) {
					if (isMounted) setUser(null);
					return;
				}

				const payload = (await response.json()) as AuthSessionResponse;
				if (!isMounted) return;

				setUser(payload.authenticated ? payload.user : null);
				setToken(payload.authenticated ? payload.token : null);
			} catch {
				if (isMounted) setUser(null);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		}

		void run();

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		user,
		isLoading,
		isAuthenticated: Boolean(user),
		token,
	};
}
