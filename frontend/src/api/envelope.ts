export type ApiSuccess<T> = { status: "success"; data: T };
export type ApiErrorBody = {
    status: "error";
    message: string;
    errors?: unknown;
};

const JSON_HEADERS = {
    "Content-Type": "application/json",
} as const;

function apiBase(): string {
    return import.meta.env.VITE_API_BASE_URL ?? "";
}

export async function parseJsonResponse<T>(
    res: Response,
): Promise<
    | { ok: true; data: T }
    | { ok: false; status: number; body: ApiErrorBody }
> {
    const json: unknown = await res.json();

    if (
        typeof json === "object" &&
        json !== null &&
        "status" in json &&
        (json as { status: string }).status === "error"
    ) {
        return {
            ok: false,
            status: res.status,
            body: json as ApiErrorBody,
        };
    }

    if (
        typeof json === "object" &&
        json !== null &&
        "status" in json &&
        (json as { status: string }).status === "success" &&
        "data" in json
    ) {
        return { ok: true, data: (json as ApiSuccess<T>).data };
    }

    return {
        ok: false,
        status: res.status,
        body: {
            status: "error",
            message: "Resposta inválida do servidor",
        },
    };
}

export async function getJson<T>(path: string): Promise<
    | { ok: true; data: T }
    | { ok: false; status: number; body: ApiErrorBody }
> {
    const res = await fetch(`${apiBase()}${path}`, {
        headers: { Accept: "application/json" },
    });
    return parseJsonResponse<T>(res);
}

export async function postJson<TBody extends object, TData>(
    path: string,
    body: TBody,
): Promise<
    | { ok: true; data: TData }
    | { ok: false; status: number; body: ApiErrorBody }
> {
    const res = await fetch(`${apiBase()}${path}`, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(body),
    });
    return parseJsonResponse<TData>(res);
}
