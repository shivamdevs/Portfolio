import PocketBase, { AuthRecord } from "pocketbase";

import { PB_BASE_URL } from "@/lib/constants";
import { getAuthSession } from "./session";

// Server-side: fresh instance per request (no shared state between SSR requests)
export async function getServerPb(): Promise<PocketBase> {
	const pb = new PocketBase(PB_BASE_URL);
	const session = await getAuthSession();

	if (session) {
		pb.authStore.save(
			session.token,
			session.record as unknown as AuthRecord,
		);
	}
	pb.autoCancellation(false);
	return pb;
}
