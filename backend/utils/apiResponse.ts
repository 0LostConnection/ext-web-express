import type { Response } from "express";

/**
 * @description Utilitários para respostas JSON padronizadas (`status` no corpo).
 * @author Geovane Saraiva da Silva
 */

/**
 * @description Resposta de sucesso com HTTP 200 (ou código opcional). Corpo: `{ status: "success", data }`.
 * @param res - Objeto Response do Express
 * @param data - Payload envolvido em `data`
 * @param statusCode - Código HTTP (padrão 200)
 * @returns void
 */
export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
    res.status(statusCode).json({ status: "success", data });
}

/**
 * @description Resposta de recurso criado (HTTP 201). Corpo: `{ status: "success", data }`.
 * @param res - Objeto Response do Express
 * @param data - Recurso criado
 * @returns void
 */
export function sendCreated<T>(res: Response, data: T): void {
    res.status(201).json({ status: "success", data });
}

/**
 * @description Confirma remoção de feedback (HTTP 200). Corpo: `{ status, message, data: { id } }`.
 * @param res - Objeto Response do Express
 * @param id - Identificador do feedback removido
 * @returns void
 */
export function sendRemoved(res: Response, id: string): void {
    res.status(200).json({
        status: "success",
        message: "Feedback removido",
        data: { id },
    });
}

/**
 * @description Resposta de erro. Corpo: `{ status: "error", message, errors? }`.
 * @param res - Objeto Response do Express
 * @param statusCode - Código HTTP de erro (ex.: 400, 404)
 * @param message - Mensagem legível para o cliente
 * @param errors - Detalhes opcionais (ex.: saída `flatten()` do Zod)
 * @returns void
 */
export function sendError(
    res: Response,
    statusCode: number,
    message: string,
    errors?: unknown,
): void {
    res.status(statusCode).json({
        status: "error",
        message,
        ...(errors !== undefined ? { errors } : {}),
    });
}
