declare global {
    namespace Express {
        interface Request {
            /** Preenchido por `validateBody(schema)` após validação bem-sucedida. */
            validatedBody?: unknown;
        }
    }
}

export {};
