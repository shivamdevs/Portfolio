import PocketBase from "pocketbase";

import { PB_BASE_URL } from "@/lib/constants";

// Server-side: fresh instance per request (no shared state between SSR requests)
export function getServerPb(): PocketBase {
    const pb = new PocketBase(PB_BASE_URL);
    pb.autoCancellation(false);
    return pb;
}
