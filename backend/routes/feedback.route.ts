import { Router } from "express";
import FeedbackController from "../controllers/FeedbackController";
import { validateBody } from "../middlewares/validateBody";
import { feedbackSendSchema } from "../schemas/feedbackSend.schema";

const router = Router();

router.post("/enviar", validateBody(feedbackSendSchema), FeedbackController.send);
router.get("/lista", FeedbackController.list);
router.delete("/remover/:id", FeedbackController.remove);

export default router;