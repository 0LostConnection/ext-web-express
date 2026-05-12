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
}

export default FeedbackController;