import { Router } from "express";
import FeedbackController from "../controllers/FeedbackController";
import { validateBody } from "../middlewares/validateBody";
import { feedbackSendSchema } from "../schemas/feedbackSend.schema";

const router = Router();

router.get("/lista", FeedbackController.list);
router.get("/", FeedbackController.list);
router.get("/:id", FeedbackController.getById);
router.post("/enviar", validateBody(feedbackSendSchema), FeedbackController.send);
router.delete("/remover/:id", FeedbackController.remove);

export default router;
