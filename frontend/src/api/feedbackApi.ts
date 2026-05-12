import type { Feedback } from "../types/feedback";
import { getJson, postJson } from "./envelope";

export async function listFeedbacks() {
    return getJson<Feedback[]>("/feedbacks/lista");
}

export async function sendFeedback(input: {
    userName: string;
    message: string;
}) {
    return postJson<typeof input, Feedback>("/feedbacks/enviar", input);
}

export async function removeFeedback(id: string) {
    return postJson<Record<string, never>, { id: string }>(
        `/feedbacks/remover/${encodeURIComponent(id)}`,
        {},
    );
}
