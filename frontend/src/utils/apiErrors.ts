import type { ApiErrorBody } from "../api/envelope";

type FlattenShape = {
    formErrors: string[];
    fieldErrors: Record<string, string[]>;
};

function isFlattenErrors(v: unknown): v is FlattenShape {
    return (
        typeof v === "object" &&
        v !== null &&
        "fieldErrors" in v &&
        typeof (v as FlattenShape).fieldErrors === "object"
    );
}

export function formatApiMessage(body: ApiErrorBody): string {
    if (body.errors !== undefined && isFlattenErrors(body.errors)) {
        const firstField = Object.values(body.errors.fieldErrors).flat()[0];
        if (firstField) return firstField;
        const formErr = body.errors.formErrors[0];
        if (formErr) return formErr;
    }
    return body.message;
}

export function extractFeedbackFieldErrors(
    body: ApiErrorBody,
): Partial<Record<"userName" | "message", string>> {
    if (body.errors === undefined || !isFlattenErrors(body.errors)) {
        return {};
    }
    const { fieldErrors } = body.errors;
    return {
        ...(fieldErrors.userName?.[0]
            ? { userName: fieldErrors.userName[0] }
            : {}),
        ...(fieldErrors.message?.[0] ? { message: fieldErrors.message[0] } : {}),
    };
}
