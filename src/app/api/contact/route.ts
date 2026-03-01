import { NextResponse } from "next/server";
import { ClientResponseError } from "pocketbase";
import * as z from "zod";

import { getServerPb } from "@/lib/pocketbase";
import { getAuthSession } from "@/lib/session";

const ContactRequestSchema = z.object({
	subject: z.string().trim().min(3).max(140),
	message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
	const session = await getAuthSession();
	if (!session?.token || !session.record?.id) {
		return NextResponse.json(
			{ error: "Authentication required." },
			{ status: 401 },
		);
	}

	let payload: z.infer<typeof ContactRequestSchema>;
	try {
		const body = (await request.json()) as unknown;
		const parsed = ContactRequestSchema.safeParse(body);
		if (!parsed.success) {
			const errors = z.flattenError(parsed.error);
			const errorMessage = Object.entries(errors.fieldErrors)
				.map(([key, value]) => `${key}: ${value.join(", ")}`)
				.join("\n");
			return NextResponse.json(
				{ error: errorMessage || "Invalid input." },
				{ status: 400 },
			);
		}
		payload = parsed.data;
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON body." },
			{ status: 400 },
		);
	}

	try {
		const pb = getServerPb();
		pb.authStore.save(session.token, null);

		await pb.collection("contacts").create({
			user: session.record.id,
			subject: payload.subject,
			message: payload.message,
		});

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (error) {
		console.error("Error submitting contact message:", error);
		if (error instanceof ClientResponseError) {
			return NextResponse.json(
				{
					error: "Unable to submit message right now.",
					details: error.message,
				},
				{ status: error.status || 500 },
			);
		}
		return NextResponse.json(
			{ error: "Unable to submit message right now." },
			{ status: 500 },
		);
	}
}
