import type { Request, Response } from "express";
import type { FeedbackSendInput } from "../schemas/feedbackSend.schema";
import FeedbackService from "../services/FeedbackService";
import {
    sendCreated,
    sendError,
    sendRemoved,
    sendSuccess,
} from "../utils/apiResponse";

class FeedbackController {
    public static async send(req: Request, res: Response) {
        const { userName, message } = req.validatedBody as FeedbackSendInput;

        const feedback = await FeedbackService.send(userName, message);

        sendCreated(res, feedback);
    }

    public static async list(_req: Request, res: Response) {
        const items = await FeedbackService.list();
        sendSuccess(res, items);
    }

    public static async remove(req: Request, res: Response) {
        const id = req.params.id as string;
        try {
            await FeedbackService.delete(id);
            sendRemoved(res, id);
        } catch (err) {
            if (err instanceof Error && err.message === "Feedback não encontrado") {
                sendError(res, 404, err.message);
                return;
            }
            throw err;
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const feedback = await FeedbackService.findById(req.params.id as string);
            sendSuccess(res, feedback);
        } catch (err) {
            if (err instanceof Error && err.message === "Feedback não encontrado") {
                sendError(res, 404, err.message);
                return;
            }
            throw err;
        }
    }
}

export default FeedbackController;