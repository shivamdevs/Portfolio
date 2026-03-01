import { cookies } from "next/headers";
import * as z from "zod";

export const COOKIE_NAME = "pb_auth";

const AuthRecordSchema = z.preprocess(
	(input) => {
		if (!input || typeof input !== "object") {
			return input;
		}

		const record = input as Record<string, unknown>;
		return {
			...record,
			avatarUrl: record.avatarUrl ?? record.avatar_url,
			emailVisibility: record.emailVisibility ?? record.email_visibility,
		};
	},
	z.object({
		id: z.string(),
		username: z.string().regex(/^[a-z0-9_.]+$/),
		email: z.email(),
		name: z.string().optional(),
		role: z.enum(["owner", "admin", "manager", "user"]).default("user"),
		avatarUrl: z.url().optional(),
		verified: z.boolean().default(false),
		emailVisibility: z.boolean().default(false),
		created: z.coerce.date(),
		updated: z.coerce.date(),
	}),
);

const AuthCookiePayloadSchema = z.object({
	token: z.jwt(),
	record: AuthRecordSchema,
});

export type AuthSessionUser = z.infer<typeof AuthRecordSchema>;
export type AuthCookiePayload = z.infer<typeof AuthCookiePayloadSchema>;

export function parseAuthCookiePayload(raw: string): AuthCookiePayload | null {
	try {
		const unknownPayload = JSON.parse(raw) as unknown;
		const parsed = AuthCookiePayloadSchema.safeParse(unknownPayload);
		return parsed.success ? parsed.data : null;
	} catch {
		return null;
	}
}

export async function getAuthSession(): Promise<
	AuthCookiePayload | null
> {
	const cookieStore = await cookies();
	const raw = cookieStore.get(COOKIE_NAME)?.value;
	if (!raw) return null;

	const payload = parseAuthCookiePayload(raw);
	if (!payload) return null;

	return payload;
}
