import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { sendError } from "../utils/apiResponse";

/**
 * @description Middleware para validar o corpo da requisição
 * @param schema - O schema Zod para validar o corpo da requisição
 * @returns O middleware para validar o corpo da requisição
 * @author Geovane Saraiva da Silva
 */
export function validateBody(schema: ZodType): RequestHandler {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);

        if (!parsed.success) {
            sendError(
                res,
                400,
                "Corpo da requisição inválido",
                parsed.error.flatten(),
            );
            return;
        }

        req.validatedBody = parsed.data;
        next();
    };
}
