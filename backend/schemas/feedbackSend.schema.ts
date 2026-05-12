import { z } from "zod";

export const feedbackSendSchema = z.object({
    userName: z.string().trim().min(1, { message: "userName é obrigatório" }),
    message: z.string().trim().min(1, { message: "message é obrigatório" }),
});

export type FeedbackSendInput = z.infer<typeof feedbackSendSchema>;
