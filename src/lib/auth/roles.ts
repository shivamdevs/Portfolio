import type { AuthSessionUser } from "@/lib/session";

export const ELEVATED_EDITOR_ROLES = ["owner", "admin", "manager"] as const;

export type UserRole = AuthSessionUser["role"];
export type ElevatedEditorRole = (typeof ELEVATED_EDITOR_ROLES)[number];

export type EditActor = Pick<AuthSessionUser, "id" | "role">;

export function isElevatedEditorRole(
	role: UserRole | null | undefined,
): role is ElevatedEditorRole {
	return !!role && ELEVATED_EDITOR_ROLES.includes(role as ElevatedEditorRole);
}

export function canEditPost(
	authorId: string,
	actor: EditActor | null | undefined,
): boolean {
	if (!actor) return false;
	if (actor.id === authorId) return true;
	return isElevatedEditorRole(actor.role);
}
