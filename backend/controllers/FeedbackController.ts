import type { Request, Response } from "express";
import type { FeedbackSendInput } from "../schemas/feedbackSend.schema";
import FeedbackService from "../services/FeedbackService";

class FeedbackController {
    public static async send(req: Request, res: Response) {
        const { userName, message } = req.validatedBody as FeedbackSendInput;

        const feedback = await FeedbackService.send(userName, message);

        res.status(201).json(feedback);
    }

    public static async list(_req: Request, res: Response) {
        const items = await FeedbackService.list();
        res.json(items);
    }

    public static async remove(req: Request, res: Response) {
        try {
            await FeedbackService.delete(req.params.id as string);
            res.status(204).send();
        } catch (err) {
            if (err instanceof Error && err.message === "Feedback não encontrado") {
                res.status(404).json({ message: err.message });
                return;
            }
            throw err;
        }
    }

    public static async getById(req: Request, res: Response) {
        try {
            const feedback = await FeedbackService.findById(req.params.id as string);
            res.json(feedback);
        } catch (err) {
            if (err instanceof Error && err.message === "Feedback não encontrado") {
                res.status(404).json({ message: err.message });
                return;
            }
            throw err;
        }
    }
}

export default FeedbackController;